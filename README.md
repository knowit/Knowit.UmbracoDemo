Knowit.UmbracoDemo
==================

Umbraco demo for Stockholm lab exercise

Document type structure:
 - Root (displays all post nodes)
 	- Post 1 (post)
 	- Post 2 (post)

Document types:
 - Post
 	- Heading (string)
 	- Lead (multiline string)
 	- Body (rich text)
 	- Tags (comma separated tag list)
 
Templates:
 - Master (Displays all stories)
 	- Post (Displays all stories and opens current (css class "current") article)
 	- Tag (Displays all stories tagged with current tag displayed)

Macro scripts:
 - RenderAllPosts (Renders all posts for Master/Post template. Parameter nodeId to decorate with "current" class)
 - RenderTagCloud (Loops through all posts for tag data, displays it in a cloud font font-size )
 	- http://core.trac.wordpress.org/browser/tags/3.4.2/wp-includes/category-template.php#L607
