# The tag MUST match the installed @playwright/test version (CI checks it):
# the image already contains the matching browsers, so no `playwright install`.
# The digest pins the multi-arch (OCI index) manifest behind the tag; Dependabot updates both.
FROM mcr.microsoft.com/playwright:v1.64.1-noble@sha256:47b510dd9230bf0b9bfc9b20102241e577ea7a99334ab4c3ca19f19770e9b8ea

ENV CI=1
# WORKDIR creates /app as root; hand it to the unprivileged user the image
# ships with so `npm ci` can create node_modules and tests can write reports.
WORKDIR /app
RUN chown pwuser:pwuser /app

COPY --chown=pwuser:pwuser package*.json ./
USER pwuser
RUN npm ci --ignore-scripts

COPY --chown=pwuser:pwuser . .

CMD ["npx", "playwright", "test"]
