#!/bin/bash
for file in *.html; do
  echo "===================================="
  echo "File: $file"
  echo "------------------------------------"
  cat "$file"
  echo ""
done