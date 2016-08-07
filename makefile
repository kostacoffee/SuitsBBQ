# all are phony because those files don't exist
.PHONY: render deploy clean

PUG = pug
PUG_FLAGS = --doctype=html
TEMPLATES_DIR = templates/
OUTPUT_DIR = public/


render:
	$(PUG) $(PUG_FLAGS) $(TEMPLATES_DIR) -o $(OUTPUT_DIR)

deploy:
	$(MAKE) render
	firebase deploy
	$(MAKE) clean

clean:
	find . -name "*.html" -type f -delete

