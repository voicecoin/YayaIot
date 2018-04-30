const routers = [
    {
        path: '/',
        meta: {
            title: 'Voicebot'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/login',
        meta: {
            title: 'Voicebot'
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/register',
        meta: {
            title: '账户注册'
        },
        component: (resolve) => require(['./views/account/register.vue'], resolve)
    },
    {
        path: '/account',
        component: (resolve) => require(['./views/master.vue'], resolve),
        children: [
            {
                path: 'settings',
                meta: {
                    title: '账户设置'
                },
                component: (resolve) => require(['./views/account/settings.vue'], resolve)
            }
        ]
    },
	/*{
        path: '/dashboard',
        meta: {
            title: '我的工作室'
        },
        component: (resolve) => require(['./views/master.vue'], resolve)
    },*/
    {
        path: '/agent',
        component: (resolve) => require(['./views/master.vue'], resolve),
        children: [
            {
                path: 'agents',
                meta: {
                    title: '我的机器人'
                },
                component: (resolve) => require(['./views/agent/agents.vue'], resolve)
            },
            {
                path: 'agent',
                meta: {
                    title: '详细信息'
                },
                component: (resolve) => require(['./views/agent/agent.vue'], resolve)
            },
            {
                path: 'create',
                meta: {
                    title: '创建机器人'
                },
                component: (resolve) => require(['./views/agent/create.vue'], resolve)
            }
        ]
    },
    {
        path: '/faq',
        component: (resolve) => require(['./views/master.vue'], resolve),
        children: [
            {
                path: 'corpus',
                meta: {
                    title: '快速问答'
                },
                component: (resolve) => require(['./views/faq/corpus.vue'], resolve)
            }
        ]
    },
    {
        path: '/intent',
        component: (resolve) => require(['./views/master.vue'], resolve),
        children: [
            {
                path: 'intents',
                meta: {
                    title: '任务意图'
                },
                component: (resolve) => require(['./views/intent/intents.vue'], resolve)
            }
        ]
    },
    {
        path: '/entity',
        component: (resolve) => require(['./views/master.vue'], resolve),
        children: [
            {
                path: 'entity-types',
                meta: {
                    title: '用户实体库管理'
                },
                component: (resolve) => require(['./views/entity/entity-types.vue'], resolve)
            },
            {
                path: 'entity-type-detail',
                meta: {
                    title: '修改实体'
                },
                component: (resolve) => require(['./views/entity/entity-type-detail.vue'], resolve)
            },
            {
                path: 'entries',
                meta: {
                    title: '实体条目维护'
                },
                component: (resolve) => require(['./views/entity/entries.vue'], resolve)
            },
            {
                path: 'entry-detail',
                meta: {
                    title: '实体条目'
                },
                component: (resolve) => require(['./views/entity/entry-detail.vue'], resolve)
            }
        ]
    },
    {
        path: '/intent',
        component: (resolve) => require(['./views/master.vue'], resolve),
        children: [
            {
                path: 'intents',
                meta: {
                    title: '意图管理'
                },
                component: (resolve) => require(['./views/intent/intents.vue'], resolve)
            },
            {
                path: 'intent',
                meta: {
                    title: '意图配置'
                },
                component: (resolve) => require(['./views/intent/intent.vue'], resolve)
            }
        ]
    },
    {
        path: '/hotword',
        component: (resolve) => require(['./views/master.vue'], resolve),
        children: [
            {
                path: 'training',
                meta: {
                    title: '训练热词'
                },
                component: (resolve) => require(['./views/hotword/training.vue'], resolve)
            }
        ]
    },
    {
        path: '/integration',
        component: (resolve) => require(['./views/master.vue'], resolve),
        children: [
            {
                path: 'third-parts',
                meta: {
                    title: '系统集成'
                },
                component: (resolve) => require(['./views/integration/third-parts.vue'], resolve)
            }
        ]
    }

];
export default routers;