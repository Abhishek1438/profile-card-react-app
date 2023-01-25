import classes from './UserCard.module.css';
import {
  HeartTwoTone,
  EditTwoTone,
  DeleteTwoTone,
  MailOutlined,
  GlobalOutlined,
  PhoneOutlined,
  HeartFilled,
} from '@ant-design/icons';
import { Divider } from 'antd';
import { Modal } from 'antd';
import { useState } from 'react';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { remove } from '../store/userDataSlice.js';

const UserCard = (props) => {
  const [form] = Form.useForm();
  const [isInWishList, setIsInWishList] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        changeValues(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [userName, setUserName] = useState(props.userName);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const [website, setWebsite] = useState(props.website);

  const changeValues = (values) => {
    setUserName(values.Name);
    setEmail(values.Email);
    setPhone(values.Phone);
    setWebsite(values.Website);
  };

  const toggleWishlist = () => {
    setIsInWishList((isInWishList) => !isInWishList);
  };

  const dispatch = useDispatch();

  return (
    <div className={classes.container}>
      <div className={classes.avatar}>
        <img
          src={`https://avatars.dicebear.com/v2/avataaars/${props.userName}.svg?options[mood][]=happy`}
          alt="avatar"
          width="200px"
        ></img>
      </div>
      <div className={classes.details}>
        <h2>{userName}</h2>
        <div>
          <p>
            <MailOutlined style={{ fontSize: '15px', paddingRight: '5px' }} />
            {email}
          </p>
          <p>
            <PhoneOutlined style={{ fontSize: '15px', paddingRight: '5px' }} />
            {phone}
          </p>
          <p>
            <GlobalOutlined style={{ fontSize: '15px', paddingRight: '5px' }} />
            {website}
          </p>
        </div>
      </div>
      <div className={classes.iconContainer}>
        {isInWishList ? (
          <HeartFilled className={classes.icon} onClick={toggleWishlist} style={{ fill: 'red' }} />
        ) : (
          <HeartTwoTone twoToneColor="red" className={classes.icon} onClick={toggleWishlist} />
        )}

        <Divider type="vertical" />
        <EditTwoTone className={classes.icon} onClick={showModal} />
        <Divider type="vertical" />
        <DeleteTwoTone className={classes.icon} onClick={() => dispatch(remove(props.uid))} />
      </div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            Name: userName,
            Email: email,
            Phone: phone,
            Website: website,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Divider />
          <Form.Item
            label="Name"
            name="Name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="Email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="Phone"
            rules={[{ required: true, message: 'Please input your phone No.!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Website"
            name="Website"
            rules={[{ required: true, message: 'Please input your Website!' }]}
          >
            <Input />
          </Form.Item>
          <Divider />
        </Form>
      </Modal>
    </div>
  );
};

export default UserCard;
