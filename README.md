# Cloud-Logger

## This branch contains a sample log file which will be helpful in debugging

#### The most common errors in the log file are as follows: 
1. exception
2. warn
3. error
4. fail
5. unauthorized
6. timeout
7. refused
8. NoSuchPageException
9. 404
10. 401
11. 500

## Potential Use Cases

### Use Case 1: Compute/VM - look for "DockerServerController".

e.g.you will see this entry in logs

2017-09-19 16:01:29.890  INFO 97625 --- [nio-9090-exec-6] c.d.w.s.provider.DockerServerController  : Find all managed docker-servers

##### Find example:

Find docker-server by id [40288184527bc4d401527bd7f9d10002]

##### Search example:

Search docker-server term [home] page [0] pageSize [10]

### Use Case 2: Volumes - look for 'DockerVolumeController'

e.g. you will see this entry in logs

2017-09-19 16:04:37.616  INFO 97625 --- [nio-9090-exec-5] c.d.w.s.provider.DockerVolumeController  : Find all Volume.

### Use Case 3: Containers - look for 'ProvisionController'

e.g. you will see this entry in logs

2017-09-19 16:06:07.581  INFO 97625 --- [nio-9090-exec-4] c.d.w.s.provision.ProvisionController    : Find all Provisions.

### Use Case 4: Blueprints - look for 'BlueprintController'

e.g. you will see this in logs -

2017-09-19 16:07:04.898  INFO 97625 --- [nio-9090-exec-4] c.d.w.s.blueprint.BlueprintController    : Filter Blueprint by term [MY] page [0] pageSize [20]
