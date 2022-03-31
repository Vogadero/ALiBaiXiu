// 验证模块
const Joi = require('joi');
// 分类模块
const {
	Comment
} = require('../../../model/Comment');

module.exports = async (req, res) => {
	// 获取评论id
	const id = req.params['id'];
	// 验证模型
	const schema = Joi.object({
		id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('评论id不符合格式'))
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
	// 通过验证 删除分类
	let comment = await Comment.findByIdAndDelete(id);
	// 响应
	res.send(comment);
};