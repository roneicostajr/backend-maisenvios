build:
	docker build -t nest-maisenvios-api .
up:
	docker run -p3000:3000 nest-maisenvios-api