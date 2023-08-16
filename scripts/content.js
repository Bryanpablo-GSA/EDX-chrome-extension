const audits = [
  {
    id: "dap",
    title: "Site includes Digital Analytics Program (DAP) code snippet",
    failureTitle:
      "Site does not include Digital Analytics Program (DAP) code snippet",
    description:
      "All public facing sites shall implement the government wide Google Analytics for public-facing pages. https://digital.gov/guides/dap/",
    regex: [
      new RegExp(
        "https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js",
        "i"
      ),
    ],
  },
  {
    id: "link-accessibility",
    title: "Site includes an accessibility link",
    failureTitle: "Site does not include an accessibility link",
    description:
      "By default, sites should link to GSA's master Accessibility policy statement. In the event that a site requires something different, we can update our scanner to ensure proper credit.",
    regex: [
      /website-information\/accessibility-aids|website-information\/website-policies|portal\/content\/116609/i,
    ],
  },
  {
    id: "link-contact",
    title: "Site includes a contact link",
    failureTitle: "Site does not include a contact link",
    description:
      "Sites should provide users contact information on each page. USWDS offers a nice pattern for this with their Footer component.",
    regex: [
      /Contact Us|Contact|Get in touch|Email Us|Email|Get support|Help Desk|send us an email|d+(s|-)d+(s|-)d+|(d+)sd+-d+/i,
    ],
  },
  {
    id: "link-foia",
    title: "Site includes an FOIA link",
    failureTitle: "Site does not include an FOIA link",
    description:
      "All sites should link to GSA.gov's page regarding Freedom of Information Act requests.",
    regex: [/reference\/freedom-of-information-act-foia|\/node\80729/i],
  },
  {
    id: "link-privacy",
    title: "Site includes a privacy link",
    failureTitle: "Site does not include a privacy link",
    description:
      "By default, sites should link to GSA's master Privacy policy statement. Most GSA sites are covered by this privacy policy. However, in the event that GSA's Chief Privacy Officer determines a distinct statement, we can update our scanner to ensure proper credit.",
    regex: [
      /website-information\/website-policies|website-information\/privacy-and-security-notice|portal\/content\/116609/i,
      /<a.*?>(Privacy Policy|Privacy).*?<\/a>/i,
    ],
  },
  {
    id: "search",
    title: "Site includes the ability to search",
    failureTitle: "Site does not include the ability to search",
    description:
      "A search option shall be present on all pages within a site. USWDS offers handy templates for a header containing search or a stand alone search component. There are a number of options for including search on the site whether it be native capabilities within the existing website platform or using search.gov. Sites that only present a single page to the public and require authentication before doing anything are exempt from this requirement. A good example of this would be https://www.fairs.reporting.gov/FAIRS/s/login/",
    regex: [
      /https:\/\/search.usa.gov\/search|https:\/\/search.gsa.gov\/search|<label.*?>.*?Search.*?<\/label>|placeholder=('|")Search|aria-label="search.*"|type="search"/i,
    ],
  },
  {
    id: "uswds-banner",
    title: "Site includes the USWDS banner component",
    failureTitle: "Site does not include the USWDS banner component",
    description:
      "Sites should implement the USWDS Banner component and place it at the top of every page.",
    regex: [new RegExp("usa-banner")],
  },
  {
    id: "uswds-identifier",
    title: "Site includes the USWDS identifier component",
    failureTitle: "Site does not include the USWDS identifier component",
    description:
      'Sites should implement the USWDS Identifier component and place it at the bottom of every page. This component serves as a home for required links such as FOIA, Privacy Policy, Accessibility, and others. The Identifier also helps denote which agency(s) operate the website. Specifically for OGP sites that live at top level domains such as sftool.gov, realpropertyprofile.gov, and others, the Identifier allows a site to maintain its distinct "brand" while also tying it back to the parent agency.',
    regex: [new RegExp("usa-identifier")],
  },
];

const page = document.documentElement.outerHTML;

if (page) {
  const results = audits.map((audit) =>
    audit.regex.some((regex) => regex.test(page))
      ? { ...audit, result: true }
      : { ...audit, result: false }
  );

  chrome.runtime.sendMessage(results);
}
