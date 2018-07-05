.PHONY: build run test stop logs

build:
	docker build --no-cache -t id-wallet:local .

run:
	docker run --detach --env-file=.env --name=id-wallet --publish="8000:8000" id-wallet:local

logs:
	docker logs id-wallet -f

stop:
	docker stop id-wallet

run-test:
	docker run --env-file=.env --name=id-wallet --publish="8000:8000" id-wallet:local yarn test

clean:
	docker stop id-wallet
	docker rm id-wallet
	docker rmi id-wallet:local
	docker rmi node:8.11.1

test: build run-test
