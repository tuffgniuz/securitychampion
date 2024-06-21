<div align="center">

# Solomon Roadmap

</div>

# Solomon

## GraqhQL API
Solomon is primarly a client side web application but a backend is desired that only serves the ASVS data using a GraphQL API implemented with FastAPI and a postgres container.

- [ ] Custom postgres Dockerfile
- [ ] Custom python Dockerfile
- [ ] CI/CD

## Miscellanous

- [ ] Clean up code

## UI General

- [ ] Improve the `Peek` component 
- [ ] Tooltip component
- [ ] Theme switcher (currently only using a dark theme)
- [ ] Show total bookmarked requirements

## Summaries
Summaries make it easier to understand the objective behind the requirement or sub category. If the reader is not familiar with application security this might lower the barier to them and can help them decide if a requirement is applicable to their project.

- [ ] Write brief summaries for each requirements
- [ ] Write brief summaries for each sub category

## MarkdownX
Integrating MDX into Solomon allows to create rich and even interactive content by combining Markdown's simplicity with the power of React componenents. MDX can be used to write code examples related to ASVS requirements.

## Export Bookmarked Requirements
The bookmarked requirements should exportable to a set of favorable or common formats such as JSON or markdown.

- [ ] Parse the bookmarked requirements into JSON
- [ ] Parse the bookmarked requirements into markdown
- [ ] Both outputs should be able to be copied so that the user can paste the results outside SOLOMON

## Requirement Generator
To lower the barier of picking the desired security requirements a requirements generator should be implemented where the user can narrow down the ASVS requirements to the ones he most likely will need. AI could be used in the form of a recommendation system, but it's definetily not required. Instead a guided filter system or scoring system can be implemented.

**Proposed solution**:
- Let the user select applicable categories. Short summaries or tooltips can help the user decide whether an ASVS category is applicable.
- Narrow down the requirements to the sub categories of the selected categories and again let the user select applicable sub categories.
- The results will be the remaining requirements selected from the narrowed down sub categories

**Alternative solution**:
Another possible approach is using a tagging system where each individidual requirement would need tags that are relevant to it. 
