// DOM elements
const contentList = document.getElementById('content-list');
const previewContent = document.getElementById('preview-content');
const refreshBtn = document.getElementById('refresh-btn');

// global variable for storing the course data
let courseData = null;


function loadJSONData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'Websys_course.json', true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    courseData = data;
                    displayCourseContent();
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            }
        }
    };
    
    xhr.send();
}


function displayCourseContent() {
    
    // clears existing content (such as when refreshing)
    contentList.innerHTML = '';
    
    // creates sections for lectures and labs
    const lecturesSection = createSection('Lectures', courseData.Websys_course.Lectures);
    const labsSection = createSection('Labs', courseData.Websys_course.Labs);
    
    // adds sections to the navigation panel
    contentList.appendChild(lecturesSection);
    contentList.appendChild(labsSection);
    
    // adds event listeners to course items
    addItemEventListeners();
}

// for creating the lectures and labs sections
function createSection(sectionName, sectionData) {
    const section = document.createElement('div');
    section.className = 'course-section';
    
    const sectionTitle = document.createElement('h3');
    sectionTitle.className = 'section-title';
    sectionTitle.textContent = sectionName;
    section.appendChild(sectionTitle);
    
    // creates the items for this section
    for (const key in sectionData) {
        const item = document.createElement('div');
        item.className = 'course-item';
        item.dataset.section = sectionName;
        item.dataset.key = key;
        
        const itemTitle = document.createElement('div');
        itemTitle.className = 'item-title';
        itemTitle.textContent = `${key}: ${escapeHtml(sectionData[key].Title)}`;
        
        const itemDesc = document.createElement('div');
        itemDesc.className = 'item-desc';
        itemDesc.textContent = escapeHtml(sectionData[key].Description);
        
        item.appendChild(itemTitle);
        item.appendChild(itemDesc);
        section.appendChild(item);
    }
    
    return section;
}


function addItemEventListeners() {
    const courseItems = document.querySelectorAll('.course-item');
    
    courseItems.forEach(item => {
        item.addEventListener('click', function() {
            // removes the active class from all items
            courseItems.forEach(i => i.classList.remove('active'));
            
            // adds the active class to clicked item
            this.classList.add('active');
            
            // gets section and key from dataset
            const section = this.dataset.section;
            const key = this.dataset.key;
            
            // displays the selected item in the preview panel
            displayPreview(section, key);
        });
    });
}


function displayPreview(section, key) {
    if (!courseData) return;
    
    const itemData = courseData.Websys_course[section][key];
    
    const previewHTML = `
        <div class="preview-item">
            <h2 class="preview-title">${escapeHtml(key)}: ${escapeHtml(itemData.Title)}</h2>
            <div class="preview-description">${escapeHtml(itemData.Description)}</div>
        </div>
    `;
    
    previewContent.innerHTML = previewHTML;
}

// refreshes the content from the JSON file
function refreshContent() {

    // indicator for when the refresh button is clicked
    refreshBtn.disabled = true;
    refreshBtn.innerHTML = 'Refreshing...';
    
    // clears the current content and shows loading
    contentList.innerHTML = '<div class="loading-message">Loading course content...</div>';
    previewContent.innerHTML = '<div class="placeholder"><p>Select a course item to view its details</p></div>';
    
    // reloads the data
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'Websys_course.json', true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            // resets the button regardless of outcome
            refreshBtn.disabled = false;
            refreshBtn.innerHTML = '<span class="icon">⟳</span> Refresh';
            
            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    courseData = data;
                    displayCourseContent();
                } catch (e) {
                    console.error('Error parsing JSON:', e);
                }
            } 
        }
    };
    // error handling
    xhr.onerror = function() {
        refreshBtn.disabled = false;
        refreshBtn.innerHTML = '<span class="icon">⟳</span> Refresh';
    };
    
    xhr.send();
}

// HTML escaping 
function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined) return '';
    return unsafe.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// event listener for refresh button
refreshBtn.addEventListener('click', refreshContent);

// initializing the application
document.addEventListener('DOMContentLoaded', function() {
    // shows loading state initially
    contentList.innerHTML = '<div class="loading-message">Loading course content...</div>';
    loadJSONData();
});