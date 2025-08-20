import { Tool } from '@langchain/core/tools'
import { ICommonObject, INode, INodeData, INodeOptionsValue, INodeParams } from '../../../../src/Interface'
import { getCredentialData, getCredentialParam } from '../../../../src/utils'
import { MCPToolkit } from '../core'

class Workday_MCP implements INode {
    label: string
    name: string
    version: number
    description: string
    type: string
    icon: string
    category: string
    baseClasses: string[]
    documentation: string
    credential: INodeParams
    inputs: INodeParams[]

    constructor() {
        this.label = 'Workday MCP'
        this.name = 'workdayMCP'
        this.version = 1.0
        this.type = 'Workday MCP Tool'
        this.icon = 'workdayMCP.png'
        this.category = 'Tools (MCP)'
        this.description = 'MCP Server for Workday (remote HTTP streamable)'
        this.documentation = 'https://github.com/Workday/workday-mcp-server'
        this.credential = {
            label: 'Workday Credential',
            name: 'token',
            type: 'credential',
            credentialNames: ['workdayBearerToken', 'workdayBasicAuth'],
            description: 'Needed when using Workday MCP server with authentication'
        }
        this.inputs = [
            {
                label: 'MCP Functional Area',
                name: 'mcpFunctionalArea',
                type: 'multiOptions',
                description: 'Actions to perform',
                options: [
                    {
                        label: 'All Workday Tools',
                        name: 'allTools'
                    },
                    {
                        label: 'Absence',
                        name: 'absence'
                    },
                    {
                        label: 'Benefits',
                        name: 'benefits'
                    },
                    {
                        label: 'Budgets',
                        name: 'budgets'
                    },
                    {
                        label: 'Customer Accounts',
                        name: 'customerAccounts'
                    },
                    {
                        label: 'Payroll',
                        name: 'payroll'
                    },
                    {
                        label: 'Personal Data',
                        name: 'personalData'
                    },
                    {
                        label: 'Procurement',
                        name: 'procurement'
                    },
                    {
                        label: 'Staffing',
                        name: 'staffing'
                    },
                    {
                        label: 'Time Tracking',
                        name: 'timeTracking'
                    }
                ]
            },
            {
                label: 'Available Actions',
                name: 'mcpActions',
                type: 'asyncMultiOptions',
                loadMethod: 'listActions',
                refresh: true
            }
        ]
        this.baseClasses = ['Tool']
    }

    //@ts-ignore
    loadMethods = {
        listActions: async (nodeData: INodeData, options: ICommonObject): Promise<INodeOptionsValue[]> => {
            try {
                const toolset = await this.getTools(nodeData, options)
                toolset.sort((a: any, b: any) => a.name.localeCompare(b.name))
                return toolset.map(({ name, ...rest }) => ({
                    label: name.toUpperCase(),
                    name: name,
                    description: rest.description || name
                }))
            } catch (error) {
                console.error('Error listing actions:', error)
                return [
                    {
                        label: 'No Available Actions',
                        name: 'error',
                        description: 'No available actions, please check your MCP server URL and credentials, then refresh.'
                    }
                ]
            }
        }
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const tools = await this.getTools(nodeData, options)
        const _mcpActions = nodeData.inputs?.mcpActions
        let mcpActions = []
        if (_mcpActions) {
            try {
                mcpActions = typeof _mcpActions === 'string' ? JSON.parse(_mcpActions) : _mcpActions
            } catch (error) {
                console.error('Error parsing mcp actions:', error)
            }
        }
        return tools.filter((tool: any) => mcpActions.includes(tool.name))
    }

    async getTools(nodeData: INodeData, options: ICommonObject): Promise<Tool[]> {
        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const mcpUrl = getCredentialParam('suvHostname', credentialData, nodeData) + "/mcp"

        if (!mcpUrl) {
            throw new Error('Missing MCP Server URL')
        }

        // Determine auth method from credentials
        let serverParams: any = {
            url: mcpUrl,
            headers: {}
        }
        // Get Bearer token from node input (from agent flow) or credential store
        const bearerToken = nodeData.inputs?.bearerToken || getCredentialParam('token', credentialData, nodeData)
        const username = getCredentialParam('username', credentialData, nodeData)
        const password = getCredentialParam('password', credentialData, nodeData)

        if (bearerToken) {
            serverParams.headers['Authorization'] = `Bearer ${bearerToken}`
        } else if (username && password) {
            serverParams.headers['Authorization'] = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
        } else {
            throw new Error('Missing credentials: provide Bearer token from flow/credentials OR username/password from credentials')
        }

        // Use SSE for remote HTTP MCP servers
        const toolkit = new MCPToolkit(serverParams, 'sse')
        await toolkit.initialize()
        const tools = toolkit.tools ?? []
        return tools as Tool[]
    }
}

module.exports = { nodeClass: Workday_MCP }