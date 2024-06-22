<div align="center">

# Solomon Roadmap

</div>


## Miscellaneous

- [ ] Clean up code

## Add Database

- [x] Setup and configure a postgres database inside a docker container
- [ ] Continous deployment to a production server for live version of solomon 

## UI General

- [ ] Improve the `Peek` component 
- [ ] Add a Tooltip component
- [ ] Implement a theme switcher (currently only using a dark theme)
- [ ] Show total bookmarked requirements
- [ ] Add animations when deleting a bookmark

## Summaries
Summaries make it easier to understand the objective behind a requirement or subcategory. If the reader is not familiar with application security, this might lower the barrier for them and help them decide if a requirement is applicable to their project.

- [ ] Write brief summaries for each requirement
- [ ] Write brief summaries for each subcategory

## MarkdownX
Integrating MDX into Solomon allows the creation of rich and interactive content by combining Markdown's simplicity with the power of React components. MDX can be used to write code examples related to ASVS requirements.

## Export Bookmarked Requirements
The bookmarked requirements should be exportable to a set of common formats such as JSON or Markdown.

- [ ] Parse the bookmarked requirements into JSON
- [ ] Parse the bookmarked requirements into Markdown
- [ ] Both outputs should be able to be copied so that the user can paste the results outside Solomon

## Requirement Generator
To lower the barrier of picking the desired security requirements, a requirements generator should be implemented where the user can narrow down the ASVS requirements to the ones they most likely need. AI could be used in the form of a recommendation system, but it is not required. Instead, a guided filter system or scoring system can be implemented.

**Proposed solution**:
- Let the user select applicable categories. Short summaries or tooltips can help the user decide whether an ASVS category is applicable.
- Narrow down the requirements to the subcategories of the selected categories and again let the user select applicable subcategories.
- The results will be the remaining requirements selected from the narrowed down subcategories.

**Alternative solution**:
Another possible approach is using a tagging system where each individual requirement would need tags relevant to it.
