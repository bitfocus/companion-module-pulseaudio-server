OUT_DIR := dist

dev: node_modules
	yarn tsc --watch

lint: node_modules
	yarn lint

${OUT_DIR}: node_modules
	yarn tsc

node_modules:
	yarn install

package: ${OUT_DIR}
	yarn companion-module-build

.PHONY: dev lint
