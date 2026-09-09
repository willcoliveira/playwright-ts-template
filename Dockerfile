# The tag MUST match the installed @playwright/test version (CI checks it):
# the image already contains the matching browsers, so no `playwright install`.
FROM mcr.microsoft.com/playwright:v1.63.0-noble

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
