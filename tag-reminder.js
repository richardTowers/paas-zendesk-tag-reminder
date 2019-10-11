const ignoredTags = [
  'govuk_paas_support',
  'govuk_paas_product_support',
  'govuk_paas_engagement_support',
  'govuk_paas_product_page',
]

const linkToTeamManual = document.createElement('a')
linkToTeamManual.href = 'https://team-manual.cloud.service.gov.uk/support/zendesk/#tagging'
linkToTeamManual.appendChild(document.createTextNode('the PaaS Team Manual.'))
const errorMessage = document.createElement('p')
errorMessage.style = 'color: red'
errorMessage.appendChild(document.createTextNode('This ticket needs a tag. See '))
errorMessage.appendChild(linkToTeamManual)

setInterval(() => {
  const tagMenu = document.querySelector('[data-test-id="ticket-fields-tags"] .zd-tag-menu-root')
  if (tagMenu) {
    const tags = [...tagMenu.querySelectorAll('.zd-tag-item a')].map(x => x.innerText)
    const paasTags = tags.filter(tag => /^govuk_paas_/.test(tag))
    const paasTaxonomyTags = paasTags.filter(tag => !ignoredTags.includes(tag))
    if (paasTaxonomyTags.length === 0) {
      tagMenu.style = 'border: 2px solid red'
      tagMenu.parentElement.appendChild(errorMessage)
    } else {
      tagMenu.style = ''
      errorMessage.parentElement.removeChild(errorMessage)
    }
  }
}, 500)
