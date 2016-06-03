@echo off

cd test

call webpack ./test.js test-bundle.js

start "" test.html
