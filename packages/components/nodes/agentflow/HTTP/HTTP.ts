import { ICommonObject, INode, INodeData, INodeParams } from '../../../src/Interface'
import { AxiosRequestConfig, Method, ResponseType } from 'axios'
import { getCredentialData, getCredentialParam } from '../../../src/utils'
import { secureAxiosRequest } from '../../../src/httpSecurity'

class HTTP_Agentflow implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    credential: INodeParams
    inputs: INodeParams[]

    constructor() {
        this.label = 'HTTP'
        this.name = 'httpAgentflow'
        this.version = 1.0
        this.type = 'HTTP'
        this.category = 'Agent Flows'
        this.description = 'Send a HTTP request'
        this.baseClasses = [this.type]
        this.credential = {
            label: 'HTTP Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['httpBasicAuth', 'httpBearerToken', 'httpApiKey'],
            optional: true
        }
        this.inputs = [
            {
                label: 'Method',
                name: 'method',
                type: 'options',
                options: [
                    {
                        label: 'GET',
                        name: 'GET'
                    },
                    {
                        label: 'POST',
                        name: 'POST'
                    },
                    {
                        label: 'PUT',
                        name: 'PUT'
                    },
                    {
                        label: 'DELETE',
                        name: 'DELETE'
                    }
                ],
                default: 'GET'
            },
            {
                label: 'URL',
                name: 'url',
                type: 'string'
            },
            {
                label: 'Headers',
                name: 'headers',
                type: 'json',
                optional: true
            },
            {
                label: 'Body',
                name: 'body',
                type: 'string',
                rows: 4,
                optional: true
            }
        ]
    }

    async run(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const method = nodeData.inputs?.method as Method
        const url = nodeData.inputs?.url as string
        const headers = nodeData.inputs?.headers as Record<string, string>
        const body = nodeData.inputs?.body as string

        const state = options.agentflowRuntime?.state as ICommonObject

        try {
            // Prepare headers
            const requestHeaders: Record<string, string> = headers || {}

            // Add credentials if provided
            const credentialData = await getCredentialData(nodeData.credential ?? '', options)
            if (credentialData && Object.keys(credentialData).length !== 0) {
                const basicAuthUsername = getCredentialParam('basicAuthUsername', credentialData, nodeData)
                const basicAuthPassword = getCredentialParam('basicAuthPassword', credentialData, nodeData)
                const bearerToken = getCredentialParam('token', credentialData, nodeData)
                const apiKeyName = getCredentialParam('key', credentialData, nodeData)
                const apiKeyValue = getCredentialParam('value', credentialData, nodeData)

                if (basicAuthUsername || basicAuthPassword) {
                    const auth = Buffer.from(`${basicAuthUsername}:${basicAuthPassword}`).toString('base64')
                    requestHeaders['Authorization'] = `Basic ${auth}`
                } else if (bearerToken) {
                    requestHeaders['Authorization'] = `Bearer ${bearerToken}`
                } else if (apiKeyName && apiKeyValue) {
                    requestHeaders[apiKeyName] = apiKeyValue
                }
            }

            // Prepare request config
            const requestConfig: AxiosRequestConfig = {
                method,
                url,
                headers: requestHeaders
            }

            // Add body for non-GET requests
            if (method !== 'GET' && body) {
                try {
                    requestConfig.data = JSON.parse(body)
                } catch {
                    requestConfig.data = body
                }
            }

            // Make the HTTP request
            const response = await secureAxiosRequest(requestConfig)

            const returnOutput = {
                id: nodeData.id,
                name: this.name,
                input: {
                    http: {
                        method,
                        url,
                        headers,
                        body
                    }
                },
                output: {
                    http: {
                        data: response.data,
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers
                    }
                },
                state
            }

            return returnOutput
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'HTTP request failed'
            throw new Error(errorMessage)
        }
    }
}

module.exports = { nodeClass: HTTP_Agentflow }