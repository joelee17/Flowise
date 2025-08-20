import { INodeParams, INodeCredential } from '../src/Interface'

class WorkdayBearerTokenCredential implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'Workday Bearer Token'
        this.name = 'workdayBearerToken'
        this.version = 1.0
        this.description = "Provide a Bearer Token to authenticate with the Workday tenant"

        this.inputs = [
            {
                label: 'Token',
                name: 'token',
                type: 'password'
            },
            {
                label: 'SUV Hostname',
                name: 'suvHostname',
                type: 'string'
            }
        ]
    }
}

module.exports = { credClass: WorkdayBearerTokenCredential }