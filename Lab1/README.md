# ITWS-2110-F25-WeatherVane-Lab-1

This lab contains both the group and individual portfolio sites that were created for lab 1 of ITWS-2110.

Work Log:
-----------------------------------------------
Sawyer:

To complete this lab, I used the format that Kat had provided in order to personalize and style my personal portfolio site as well as the group portfolio site.

On several occassions I did not remember exact HTML syntax so i had to refer to:
- previous ITWS/personal work
- w3schools.com 

These references were mostly for syntax but I also used w3 schools for a bit of css styling help, such as making a link not be blue/purple and inheriting the color of its larger div

For the little javascript i did(member box on hover), i relied mostly on w3schools as well as my intro to ITWS term project.

-----------------------------------------------

Manny : 
For this lab, I took the HTML/CSS template that my teammate Kat built and customized it with my own info to create my personal portfolio page.

Most of my work was content-focused: I swapped out all the placeholder text with my actual bio, contact details, projects, and work experience. I kept all the class names from Kat's structure so the styling would still work.

I ran into a couple of hiccups:

Image Aspect Ratio: My profile picture was looking stretched in the circular frame. I messed with the inline aspect-ratio property and eventually figured out it was better to just let the .circular-image CSS class handle it.

JavaScript Hover: The cool hover effect for team members broke because I had a typo in my data-image path. I used the browser's DevTools console to find the 404 error and fixed the file path.


Resources I used - w3schools: Quick refreshers on HTML list syntax and how to remove link styling.
MDN Web Docs: To understand how data attributes work.

-----------------------------------------------

MJ: 

As with my other groupmates, I used the HTML / CSS template Kat created and filled it in with my own information. Some of this info was lifted from the resume I created for Intro to ITWS. 

Briefly I ran into an issue regarding several links (my email, the link for my high school) being the default blue instead of the light blue consistent with our website. I resolved this by creating a class for my high school div and having it inherit the text color of that div. My email had its own class as well, but I switched to simply using the "email" class at the time of writing this. Perhaps merging the high school classes into a single class would also be a good idea?

Resources:
    - This explaination on microformats: https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Microformats
-----------------------------------------------

Kat: 

For this lab, I first started by drafting a design template for the main landing page / individual portfolio pages in Figma. Then, I used one of Figma's built-in plugins to convert this design directly into its HTML/CSS equivalent, bringing it into our index.html file and making tweaks as necessary. Although using the conversion plugin does save quite a bit of time, the only downside is that some of the class names are extremely impractical, and certain classes are completely redundant. Consequently, I spent a lot of time correcting the CSS.

Another small issue I encountered was a file becomimg corrupted/unmutable when I tried to add it to my local repo. Fortunately, I was able to resolve it by running the "rm -rf" command in a Linux terminal. To avoid this in the future, I will ensure that I only add files to my local repo via the File Explorer (as opposed to dragging it straight into VSCode, which is what produced the issue).

Fortunately, debugging the CSS/HTML formatting was my only major roadblock/timesink. When I handed off these templates to my teammates, they adopted them for their own portfolio pages as appropriate. With respect to the microformat portion of this lab, I found the resource that MJ linked quite useful, and used this site to guide my implementation of hCard on my page. Additionally, to ensure consistency in theming across our respective portfolio pages, I tried to ensure that my HTML formatting/hCard microformat usage was similar to my teammates.

Resources:
- How do I right align div elements? (Stack Overflow) - https://stackoverflow.com/questions/7693224/how-do-i-right-align-div-elements
- HTML id Attribute (w3schools) - https://www.w3schools.com/html/html_id.asp
- hCard 1.0 (Microformats Wiki) - https://microformats.org/wiki/hcard
