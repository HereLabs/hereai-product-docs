import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMermaid from './remark-mermaid.mjs';

export default defineConfig({
  site: 'https://docs.hereai.com',
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
  integrations: [
    starlight({
      title: 'HereAI Docs',
      description: 'Technical documentation for HereAI products.',
      favicon: '/favicon.svg',
      logo: {
        light: './src/assets/logo-blue.png',
        dark: './src/assets/logo-white.png',
        replacesTitle: true,
      },
      customCss: [
        './src/styles/tokens.css',
        './src/styles/custom.css',
      ],
      head: [
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

function initMermaid() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
    securityLevel: 'loose',
    flowchart: { htmlLabels: true, curve: 'basis' },
  });
}

async function renderMermaid() {
  initMermaid();
  // Stash the source on each div so theme-toggle re-render works.
  document.querySelectorAll('.mermaid').forEach((el) => {
    if (!el.dataset.source) el.dataset.source = el.textContent.trim();
    if (el.dataset.processed === 'true') {
      // Reset to source so mermaid re-renders with the new theme.
      el.removeAttribute('data-processed');
      el.innerHTML = el.dataset.source;
    }
  });
  try {
    await mermaid.run({ querySelector: '.mermaid:not([data-processed])' });
  } catch (e) {
    console.error('[mermaid]', e);
  }
}

document.addEventListener('astro:page-load', renderMermaid);
if (document.readyState !== 'loading') renderMermaid();
else document.addEventListener('DOMContentLoaded', renderMermaid);

// Re-render on theme toggle so dark/light follows the site theme.
const themeObserver = new MutationObserver(renderMermaid);
themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
          `.trim(),
        },
      ],
      sidebar: [
        {
          label: 'Mira',
          items: [
            { label: 'Overview', link: '/mira/' },
            {
              label: 'Get started',
              items: [
                { label: 'Overview', link: '/mira/get-started/' },
                { label: 'Quickstart', link: '/mira/get-started/quickstart/' },
                { label: 'How Mira fits your stack', link: '/mira/get-started/how-mira-fits-your-stack/' },
              ],
            },
            {
              label: 'Concepts',
              items: [
                { label: 'Overview', link: '/mira/concepts/' },
                { label: 'Operating model', link: '/mira/concepts/operating-model/' },
                { label: 'The GTM kit', link: '/mira/concepts/the-gtm-kit/' },
                { label: 'Versioning & approval', link: '/mira/concepts/versioning-and-approval/' },
                { label: 'Agents', link: '/mira/concepts/agents/' },
                { label: 'Multi-tenancy & isolation', link: '/mira/concepts/multi-tenancy-and-isolation/' },
                { label: 'How AI generation is sandboxed', link: '/mira/concepts/how-ai-generation-is-sandboxed/' },
              ],
            },
            {
              label: 'Workflows',
              items: [
                { label: 'Overview', link: '/mira/workflows/' },
                {
                  label: 'Onboard your catalog',
                  items: [
                    { label: 'Overview', link: '/mira/workflows/onboard-your-catalog/' },
                    { label: 'Import from CSV', link: '/mira/workflows/onboard-your-catalog/import-from-csv/' },
                    { label: 'Import via JSON API', link: '/mira/workflows/onboard-your-catalog/import-via-json-api/' },
                    { label: 'PIM / marketplace connectors', link: '/mira/workflows/onboard-your-catalog/pim-marketplace-connectors/' },
                    { label: 'Re-import & change detection', link: '/mira/workflows/onboard-your-catalog/re-import-and-change-detection/' },
                    { label: 'Manage your catalog', link: '/mira/workflows/onboard-your-catalog/manage-your-catalog/' },
                  ],
                },
                {
                  label: 'Generate GTM kits',
                  items: [
                    { label: 'Overview', link: '/mira/workflows/generate-gtm-kits/' },
                    { label: 'Trigger a generation', link: '/mira/workflows/generate-gtm-kits/trigger-a-generation/' },
                    { label: 'Regenerate sections', link: '/mira/workflows/generate-gtm-kits/regenerate-sections/' },
                    { label: 'Variants & risky-claim flags', link: '/mira/workflows/generate-gtm-kits/variants-and-risky-claim-flags/' },
                  ],
                },
                {
                  label: 'Review & approve',
                  items: [
                    { label: 'Overview', link: '/mira/workflows/review-and-approve/' },
                    { label: 'Multi-approver workflows', link: '/mira/workflows/review-and-approve/multi-approver-workflows/' },
                    { label: 'Risky-claim rules', link: '/mira/workflows/review-and-approve/risky-claim-rules/' },
                    { label: 'Re-approval & audit', link: '/mira/workflows/review-and-approve/re-approval-and-audit/' },
                  ],
                },
                {
                  label: 'Publish landing pages',
                  items: [
                    { label: 'Overview', link: '/mira/workflows/publish-landing-pages/' },
                    { label: 'Templates & slugs', link: '/mira/workflows/publish-landing-pages/templates-and-slugs/' },
                    { label: 'Custom CSS', link: '/mira/workflows/publish-landing-pages/custom-css/' },
                    { label: 'Custom domain', link: '/mira/workflows/publish-landing-pages/custom-domain/' },
                  ],
                },
                {
                  label: 'Capture & route leads',
                  items: [
                    { label: 'Overview', link: '/mira/workflows/capture-and-route-leads/' },
                    { label: 'Configure capture forms', link: '/mira/workflows/capture-and-route-leads/configure-capture-forms/' },
                    { label: 'Routing rules', link: '/mira/workflows/capture-and-route-leads/routing-rules/' },
                    { label: 'Replay & bidirectional sync', link: '/mira/workflows/capture-and-route-leads/replay-and-bidirectional-sync/' },
                  ],
                },
                {
                  label: 'Run outbound sequences',
                  items: [
                    { label: 'Overview', link: '/mira/workflows/run-outbound-sequences/' },
                    { label: 'Draft from approved snippets', link: '/mira/workflows/run-outbound-sequences/draft-from-approved-snippets/' },
                    { label: 'Variant rotation & deliverability', link: '/mira/workflows/run-outbound-sequences/variant-rotation-and-deliverability/' },
                  ],
                },
                {
                  label: 'Learn from outcomes',
                  items: [
                    { label: 'Overview', link: '/mira/workflows/learn-from-outcomes/' },
                    { label: 'Dashboards, cohorts & attribution', link: '/mira/workflows/learn-from-outcomes/dashboards-cohorts-and-attribution/' },
                  ],
                },
              ],
            },
            {
              label: 'Integrations',
              items: [
                { label: 'Overview', link: '/mira/integrations/' },
                { label: 'HubSpot', link: '/mira/integrations/hubspot/' },
                { label: 'Salesforce', link: '/mira/integrations/salesforce/' },
                { label: 'Generic webhook', link: '/mira/integrations/generic-webhook/' },
                { label: 'ESPs', link: '/mira/integrations/esps/' },
                { label: 'SSO', link: '/mira/integrations/sso/' },
                { label: 'SCIM', link: '/mira/integrations/scim/' },
                { label: 'PIM (Salsify, Productsup)', link: '/mira/integrations/pim/' },
              ],
            },
            {
              label: 'Administration',
              items: [
                { label: 'Overview', link: '/mira/administration/' },
                { label: 'Roles & permissions', link: '/mira/administration/roles-and-permissions/' },
                { label: 'Audit log', link: '/mira/administration/audit-log/' },
                { label: 'Billing & cost reporting', link: '/mira/administration/billing-and-cost-reporting/' },
              ],
            },
            {
              label: 'Security & trust',
              items: [
                { label: 'Overview', link: '/mira/security/' },
                { label: 'Tenant isolation', link: '/mira/security/tenant-isolation/' },
                { label: 'Agent boundaries', link: '/mira/security/agent-boundaries/' },
                { label: 'Data handling & retention', link: '/mira/security/data-handling-and-retention/' },
                { label: 'GDPR', link: '/mira/security/gdpr/' },
                { label: 'Subprocessors', link: '/mira/security/subprocessors/' },
              ],
            },
            {
              label: 'Developer reference',
              items: [
                { label: 'Overview', link: '/mira/developer-reference/' },
                { label: 'Webhook payload formats', link: '/mira/developer-reference/webhook-payload-formats/' },
                { label: 'Catalog ingestion API', link: '/mira/developer-reference/catalog-ingestion-api/' },
                { label: 'Webhook signing', link: '/mira/developer-reference/webhook-signing/' },
                { label: 'Rate limits & errors', link: '/mira/developer-reference/rate-limits-and-errors/' },
              ],
            },
            {
              label: 'Resources',
              items: [
                { label: 'Overview', link: '/mira/resources/' },
                { label: 'Changelog', link: '/mira/resources/changelog/' },
                { label: 'Public roadmap', link: '/mira/resources/public-roadmap/' },
                { label: 'Glossary', link: '/mira/resources/glossary/' },
                { label: 'Support & SLA', link: '/mira/resources/support-and-sla/' },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
