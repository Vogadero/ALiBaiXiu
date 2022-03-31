// 验证模块
const Joi = require('joi');
// 用户模块
const {
	Comment
} = require('../../../model/Comment');

module.exports = async (req, res) => {
	// 待修改评论id
	const id = req.params['id'];
	// 定义对象验证规则
	const schema = Joi.object({
		id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('评论id非法'))
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
	let comment = await Comment.findByIdAndUpdate(id, {
		$set: {
			state: req.fields.state
		}
	}, {
		new: true
	});
	// 响应
	res.send(comment);
};