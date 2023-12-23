#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if ["$VERCEL_GIT_COMMIT_REF" == "l10n_master"] || ["$VERCEL_GIT_COMMIT_REF" == "vps-migrate"]; then
    # Don't build
    echo "🛑 - Build cancelled"
    exit 0;

else
    # Proceed with the build
    echo "✅ - Build can proceed"
    exit 1;
fi