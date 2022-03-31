
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { createVNode } from 'vue';
import { Modal, message } from 'ant-design-vue';

export const showConfirm = (params = {}) => {
  Modal.confirm({
    title: params.title || 'Do you want to delete these items?',
    icon: createVNode(ExclamationCircleOutlined),
    content: params.content || 'When clicked the OK button, this dialog will be closed after 1 second',
    onOk() {
      params.handleOk && params.handleOk();
    },
    onCancel() {
        message.success('Cancellation succeeded')
    },
    });
}