// 验证模块
const Joi = require('joi');
// 用户模块
const {
	Category,
	validateCategory
} = require('../../../model/Category');

module.exports = async (req, res) => {
	// 待修改用户id
	req.fields._id = req.params['id'];
	console.log()
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
	// 通过验证 更新分类信息
	let category = await Category.findByIdAndUpdate(req.fields._id, {
		$set: req.fields
	}, {
		new: true
	});
	// 响应
	res.send(category);
}