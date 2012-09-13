Knowit.UmbracoDemo
==================

Umbraco demo for Stockholm lab exercise

Document type structure:
 - Root (displays all post nodes)
 	- Post 1 (post)
 	- Post 2 (post)
 - Tags
 	- Tag 1 (displays all posts tagged with Tag 1)
 	- Tag 2 (displays all posts tagged with Tag 2)

Document types:
 - Post
 	- Heading (string)
 	- Lead (multiline string)
 	- Body (rich text)
 	- Tags (collection of tags)
 - Tag
 	- Name

 Templates:
 - Master (Displays all stories)
 	- Post (Displays all stories and opens current (css class "current") article)
 	- Tag (Displays all stories tagged with current tag displayed)