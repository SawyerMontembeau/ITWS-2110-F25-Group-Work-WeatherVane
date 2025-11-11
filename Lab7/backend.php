<?php
$host = 'localhost';
$dbname = 'lab7';
$username = 'root'; 
$password = '';   

header('Content-Type: application/json');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get the action from POST or GET
    $action = $_POST['action'] ?? $_GET['action'] ?? '';
    
    switch($action) {
        case 'archive':
            archiveCourseContent($pdo);
            break;
        case 'delete':
            deleteTables($pdo);
            break;
        case 'check':
            checkTablesExist($pdo);
            break;
        default:
            echo json_encode(['error' => 'Invalid action']);
    }
    
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}

function archiveCourseContent($pdo) {
    try {
        createArchiveTables($pdo);
        
        // Fetch the Web Sys course JSON data
        $stmt = $pdo->prepare("SELECT * FROM courses WHERE title LIKE '%Web Sys%' OR title LIKE '%web sys%'");
        $stmt->execute();
        $course = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$course) {
            echo json_encode(['error' => 'Web Sys course not found in database']);
            return;

        $jsonFile = 'Websys_course.json'; // Make sure this file is in the same directory
        
        if (!file_exists($jsonFile)) {
            echo json_encode(['error' => 'JSON file not found']);
            return;
        }
        
        $jsonData = file_get_contents($jsonFile);
        $data = json_decode($jsonData, true);
        
        if (!$data || !isset($data['Websys_course'])) {
            echo json_encode(['error' => 'Invalid JSON structure']);
            return;
        }
        
        $courseContent = $data['Websys_course'];
        $insertedCount = 0;
        
        // Archive Lectures
        if (isset($courseContent['Lectures'])) {
            foreach ($courseContent['Lectures'] as $lectureName => $lectureData) {
                $stmt = $pdo->prepare("INSERT INTO archived_lectures (lecture_name, title, description, archived_date) 
                                      VALUES (:name, :title, :description, NOW())");
                $stmt->execute([
                    ':name' => $lectureName,
                    ':title' => $lectureData['Title'],
                    ':description' => $lectureData['Description']
                ]);
                $insertedCount++;
            }
        }
        
        // Archive Labs
        if (isset($courseContent['Labs'])) {
            foreach ($courseContent['Labs'] as $labName => $labData) {
                $stmt = $pdo->prepare("INSERT INTO archived_labs (lab_name, title, description, archived_date) 
                                      VALUES (:name, :title, :description, NOW())");
                $stmt->execute([
                    ':name' => $labName,
                    ':title' => $labData['Title'],
                    ':description' => $labData['Description']
                ]);
                $insertedCount++;
            }
        }
        
        echo json_encode([
            'success' => true,
            'message' => "Successfully archived $insertedCount items from Web Sys course",
            'lectures' => count($courseContent['Lectures'] ?? []),
            'labs' => count($courseContent['Labs'] ?? [])
        ]);
        
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Archive failed: ' . $e->getMessage()]);
    }
}

function createArchiveTables($pdo) {
    // Create archived_lectures table
    $pdo->exec("CREATE TABLE IF NOT EXISTS archived_lectures (
        id INT PRIMARY KEY AUTO_INCREMENT,
        lecture_name VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        archived_date DATETIME NOT NULL
    )");
    
    // Create archived_labs table
    $pdo->exec("CREATE TABLE IF NOT EXISTS archived_labs (
        id INT PRIMARY KEY AUTO_INCREMENT,
        lab_name VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        archived_date DATETIME NOT NULL
    )");
}

function deleteTables($pdo) {
    try {
        $pdo->exec("DROP TABLE IF EXISTS archived_lectures");
        $pdo->exec("DROP TABLE IF EXISTS archived_labs");
        
        echo json_encode([
            'success' => true,
            'message' => 'Archive tables deleted successfully'
        ]);
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Delete failed: ' . $e->getMessage()]);
    }
}

function checkTablesExist($pdo) {
    try {
        $stmt = $pdo->query("SHOW TABLES LIKE 'archived_%'");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        $lectureCount = 0;
        $labCount = 0;
        
        if (in_array('archived_lectures', $tables)) {
            $stmt = $pdo->query("SELECT COUNT(*) FROM archived_lectures");
            $lectureCount = $stmt->fetchColumn();
        }
        
        if (in_array('archived_labs', $tables)) {
            $stmt = $pdo->query("SELECT COUNT(*) FROM archived_labs");
            $labCount = $stmt->fetchColumn();
        }
        
        echo json_encode([
            'success' => true,
            'tablesExist' => count($tables) > 0,
            'tables' => $tables,
            'lectureCount' => $lectureCount,
            'labCount' => $labCount
        ]);
    } catch(PDOException $e) {
        echo json_encode(['error' => 'Check failed: ' . $e->getMessage()]);
    }
}
?>