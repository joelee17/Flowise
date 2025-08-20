import { INodeParams, INodeCredential } from '../src/Interface'

class WorkdayCredential implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'Workday Basic Auth'
        this.name = 'workdayBasicAuth'
        this.version = 1.0
        this.description = "Provide a username and password to authenticate with the Workday tenant"
        this.inputs = [
            {
                label: 'Workday Username',
                name: 'username',
                type: 'string'
            },
            {
                label: 'Workday Password',
                name: 'password',
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

module.exports = { credClass: WorkdayCredential }