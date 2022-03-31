// 验证模块
const Joi = require('joi');
// 用户模块
const {
	User,
	validateUser
} = require('../../../model/User');
// 工具
const _ = require('lodash');

module.exports = async (req, res) => {
	// 将密码、邮箱字段抛除
	req.fields = _.pick(req.fields, ['nickName', 'role', 'avatar', 'status']);
	req.fields._id = req.params['id'];
	// 定义对象验证规则
	const schema = Joi.object({
		_id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'))
	});
	// 验证客户端传递过来的请求参数 
	try {
		// 实施验证
		await schema.validateAsync(req.fields, {
			// 允许对象包含被忽略的未知键
			allowUnknown: true
		});
		// 验证失败
	} catch (error) {
		// 将错误信息响应给客户端
		return res.status(400).send({
			message: error.message
		});
	};
	// 通过验证 更新用户信息
	let user = await User.findByIdAndUpdate(req.fields._id, {
		$set: req.fields
	}, {
		// new: true 返回修改后的文档 默认值为false 返回原始文档
		new: true,
		// fields: '-password' 从返回值中抛除密码字段
		fields: '-password'
	});
	// 响应
	res.send(user);
};