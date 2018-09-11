# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.2.0"></a>
# [2.2.0](https://github.com/DucaturFw/duxi-eos/compare/v2.1.0...v2.2.0) (2018-09-11)


### Bug Fixes

* **eos:** Add `--max-transaction-time=1000` ([d195f4e](https://github.com/DucaturFw/duxi-eos/commit/d195f4e))
* **reader:** Remove `console.log` from `base-app` ([512ca37](https://github.com/DucaturFw/duxi-eos/commit/512ca37))
* **reader:** Strong typed applications in entrypoint ([3f1350b](https://github.com/DucaturFw/duxi-eos/commit/3f1350b))


### Features

* **root:** Docker-compose runs all reader ([e7c4734](https://github.com/DucaturFw/duxi-eos/commit/e7c4734))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/DucaturFw/duxi-eos/compare/v2.0.0...v2.1.0) (2018-09-11)


### Bug Fixes

* **reader:** Now, `DateString` is alias to `Date` ([879c21b](https://github.com/DucaturFw/duxi-eos/commit/879c21b))


### Features

* **reader:** `makeReader` method to create reader from config ([f1d97dd](https://github.com/DucaturFw/duxi-eos/commit/f1d97dd))
* **reader:** `PubKey` schema and `PubKeyModel` ([7b6b450](https://github.com/DucaturFw/duxi-eos/commit/7b6b450))
* **reader:** Add new `action-traces` reader app ([37fdb3c](https://github.com/DucaturFw/duxi-eos/commit/37fdb3c))
* **reader:** Add new `block-states` reader app ([d8001ec](https://github.com/DucaturFw/duxi-eos/commit/d8001ec))
* **reader:** Add new `transaction-traces` reader app ([1821694](https://github.com/DucaturFw/duxi-eos/commit/1821694))
* **reader:** Add new `transaction` reader app ([9ab9da6](https://github.com/DucaturFw/duxi-eos/commit/9ab9da6))
* **reader:** Use all readers by default ([257e03f](https://github.com/DucaturFw/duxi-eos/commit/257e03f))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/DucaturFw/duxi-eos/compare/v1.0.0...v2.0.0) (2018-09-11)


### Bug Fixes

* **eos:** Fix error in shell script which prevent mocking ([5294d0f](https://github.com/DucaturFw/duxi-eos/commit/5294d0f))
* **reader:** mutate ctx to halt connection ([5302f02](https://github.com/DucaturFw/duxi-eos/commit/5302f02))


### Code Refactoring

* **reader:** Inject default context from entrypoint ([76df3f7](https://github.com/DucaturFw/duxi-eos/commit/76df3f7))


### Features

* **reader:** logger modules in context ([63711dc](https://github.com/DucaturFw/duxi-eos/commit/63711dc))
* **root:** add example backend and frontend ([fb4fc01](https://github.com/DucaturFw/duxi-eos/commit/fb4fc01))
* **root:** docker-compose services to run examples ([5424a27](https://github.com/DucaturFw/duxi-eos/commit/5424a27))


### BREAKING CHANGES

* **reader:** Each app `run` function should receive `Partial<IContext>` argument



<a name="1.0.0"></a>
# [1.0.0](https://github.com/DucaturFw/duxi-eos/compare/v0.3.0-0...v1.0.0) (2018-09-11)


### Bug Fixes

* **reader:** build source in Dockerfile ([ae49c2f](https://github.com/DucaturFw/duxi-eos/commit/ae49c2f))
* **reader:** remove unused imports ([da93418](https://github.com/DucaturFw/duxi-eos/commit/da93418))
* **reader:** rethinktable isn't required in context ([4235c98](https://github.com/DucaturFw/duxi-eos/commit/4235c98))


### Code Refactoring

* **reader:** database helpers works without checks ([c3cee62](https://github.com/DucaturFw/duxi-eos/commit/c3cee62))


### Features

* **reader:** .env file to populate ENV vars ([6da35e5](https://github.com/DucaturFw/duxi-eos/commit/6da35e5))
* **reader:** `IContext` inteface to store state of app ([5f084cf](https://github.com/DucaturFw/duxi-eos/commit/5f084cf))
* **reader:** `important` utility to assert value ([e024aae](https://github.com/DucaturFw/duxi-eos/commit/e024aae))
* **reader:** add `AccountModel` ([8eb9b5c](https://github.com/DucaturFw/duxi-eos/commit/8eb9b5c))
* **reader:** add `ActionTraceModel` ([bf59d65](https://github.com/DucaturFw/duxi-eos/commit/bf59d65))
* **reader:** add `BlockModel` ([71a83bb](https://github.com/DucaturFw/duxi-eos/commit/71a83bb))
* **reader:** add `BlockStateModel` ([22f5092](https://github.com/DucaturFw/duxi-eos/commit/22f5092))
* **reader:** add `dotenv` and `rethinkdb` dependencies ([38a556d](https://github.com/DucaturFw/duxi-eos/commit/38a556d))
* **reader:** add `TransactionStateModel` ([b9bd4ea](https://github.com/DucaturFw/duxi-eos/commit/b9bd4ea))
* **reader:** Add known tables to context ([4f1f478](https://github.com/DucaturFw/duxi-eos/commit/4f1f478))
* **reader:** functional style helpers ([05a772d](https://github.com/DucaturFw/duxi-eos/commit/05a772d))
* **reader:** Implement Blocks app ([485380d](https://github.com/DucaturFw/duxi-eos/commit/485380d))
* **reader:** RethinkDB helpful utilities: `getConnection`, `getOrCreateDatabase`, `checkOrCreateTab ([0e7df4c](https://github.com/DucaturFw/duxi-eos/commit/0e7df4c))
* **root:** Docker-compose to run all services at once ([09c8cd6](https://github.com/DucaturFw/duxi-eos/commit/09c8cd6))


### BREAKING CHANGES

* **reader:** Prepare `IContext` before calling of `getLastSyncedBlock`



<a name="0.3.0-0"></a>
# [0.3.0-0](https://github.com/DucaturFw/duxi-eos/compare/v0.2.0...v0.3.0-0) (2018-09-11)


### Features

* **reader:** Add typegoose model of Account record ([8695e62](https://github.com/DucaturFw/duxi-eos/commit/8695e62))
* **reader:** Add typegoose model of ActionTrace record ([4043814](https://github.com/DucaturFw/duxi-eos/commit/4043814))
* **reader:** Add typegoose model of BlockState record ([d2f537d](https://github.com/DucaturFw/duxi-eos/commit/d2f537d))
* **reader:** command args miniservice starter ([4674e26](https://github.com/DucaturFw/duxi-eos/commit/4674e26))
* **reader:** Reexport all models from `./models` ([6b411f9](https://github.com/DucaturFw/duxi-eos/commit/6b411f9))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/DucaturFw/duxi-eos/compare/v0.1.0...v0.2.0) (2018-09-11)


### Features

* **eos:** blog contracts with simple logic ([5e5e68d](https://github.com/DucaturFw/duxi-eos/commit/5e5e68d))
* **eos:** quick start EOS node scripts ([57cb417](https://github.com/DucaturFw/duxi-eos/commit/57cb417))
* **root:** Auto changelog generation based on [standard-version](/conventional-changelog/standard-v ([b877522](https://github.com/DucaturFw/duxi-eos/commit/b877522))



<a name="0.1.0"></a>
# 0.1.0 (2018-09-11)


### Features

* **handler:** Initial module commit ([9194f1b](https://github.com/DucaturFw/duxi-eos/commit/9194f1b))
* **reader:** Initial module commit ([5e39c1d](https://github.com/DucaturFw/duxi-eos/commit/5e39c1d))
* **root:** Define module structure ([9e10b5a](https://github.com/DucaturFw/duxi-eos/commit/9e10b5a))
* **root:** Init repository with .gitignore ([5601bc2](https://github.com/DucaturFw/duxi-eos/commit/5601bc2))
