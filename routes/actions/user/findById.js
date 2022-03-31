// 验证模块
const Joi = require('joi');
// 用户模块
const {
	User
} = require('../../../model/User');

module.exports = async (req, res) => {
	// 获取用户id
	const id = req.params['id'];
	// 定义对象的验证规则
	const schema = Joi.object({
		id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id不符合格式'))
	});
	// 验证客户端传递过来的请求参数 
	try {
		// 实施验证
		await schema.validateAsync(req.params);
		// 验证失败
	} catch (error) {
		// 将错误信息响应给客户端
		return res.status(400).send({
			message: error.message
		});
	};
	// 通过验证 查询用户信息
	const user = await User.findById(id).select('-password');
	// 响应
	return res.send(user);
};