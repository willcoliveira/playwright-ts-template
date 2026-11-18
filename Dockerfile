# The tag MUST match the installed @playwright/test version (CI checks it):
# the image already contains the matching browsers, so no `playwright install`.
# The digest pins the multi-arch (OCI index) manifest behind the tag; Dependabot updates both.
FROM mcr.microsoft.com/playwright:v1.65.1-noble@sha256:1507cbfc550a63a6b7396791ca4f00df17beb56342d2447b3f106c306f525579

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
