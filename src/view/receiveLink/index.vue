<template>
    <div>
        <!-- 面包屑 -->
        <a-breadcrumb class="aBreadcrumbBox">
            <a-breadcrumb-item>
                <router-link to="/index/frequencyList">次数包列表</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>创建领取链接</a-breadcrumb-item>
        </a-breadcrumb>

        <!-- 表单 -->
        <a-card class="box-card">
            <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-model-item label="次数包类型：" labelAlign="left">
                    <a-select v-model="form.region">
                        <a-select-option value="shanghai">
                            匀速提词
                        </a-select-option>
                        <a-select-option value="beijing">
                            AI提词
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="用户类型" labelAlign="left">
                    <a-select v-model="form.date1">
                        <a-select-option value="shanghai">
                            普通用户
                        </a-select-option>
                        <a-select-option value="beijing">
                            内侧官
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="下发张数" labelAlign="left">
                    <a-input v-model="form.desc" />
                </a-form-model-item>
                <a-form-model-item label="手机账号" labelAlign="left">
                    <a-input v-model="form.desc" />
                </a-form-model-item>
                <a-form-model-item label="有效期" labelAlign="left" v-show="linkTrue">
                    <a-select v-model="form.validity">
                        <a-select-option value="shanghai">
                            3天
                        </a-select-option>
                        <a-select-option value="beijing">
                            7天
                        </a-select-option>
                        <a-select-option value="beijing">
                            30天
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item labelAlign="left">
                    <a-button type="primary" @click="createLink">
                        生成领取链接
                    </a-button>
                </a-form-model-item>
                <a-form-model-item v-show="linkTrue" labelAlign="left">
                    <a-row type="flex" :gutter="20">
                        <a-col :span="18">
                            <a-input v-model="form.linkUrl" />
                        </a-col>
                        <a-col>
                            <a-button type="primary">
                                复制链接
                            </a-button>
                        </a-col>
                    </a-row>
                </a-form-model-item>
            </a-form-model>
        </a-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            labelCol: { span: 1 },
            wrapperCol: { span: 6 },
            linkTrue: false,
            form: {
                name: '',
                region: "AI提词",
                date1: "普通用户",
                validity: "24小时",
                delivery: false,
                linkUrl: "#小程序://提词器/X19doziXaP9Qr21",
                type: [],
                resource: '',
                desc: '',
            },
        };
    },
    methods: {
        onSubmit() {
            console.log('submit!', this.form);
        },
        createLink() {
            this.linkTrue = true
        }
    },
}
</script>

<style lang="less" scoped>
.box-card{
    margin-top: 20px;
}
</style>