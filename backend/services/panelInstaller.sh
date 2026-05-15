#!/bin/bash
DOMAIN="$1"
SSL="$2"
CF_TOKEN="$3"

# ... update, deps, MariaDB, DB auto, PHP 8.2, panel, nginx, etc.

if [[ ! -z "$CF_TOKEN" ]]; then
  mkdir -p /etc/cloudflared
  echo "$CF_TOKEN" > /etc/cloudflared/token.txt
  cloudflared service install --token "$CF_TOKEN"
  systemctl enable cloudflared
  systemctl start cloudflared
fi
