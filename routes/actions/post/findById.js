// 验证模块
const Joi = require('joi');
// 用户模块
const {
	Post
} = require('../../../model/Post');

module.exports = async (req, res) => {
	// 获取用户id
	const id = req.params['id'];
	// 验证模型
	const schema = Joi.object({
		id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('id不符合格式'))
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
	// 通过验证 查询文章信息
	const post = await Post.findOne({
		_id: id
	}).populate('author category');
	// 增加文章阅读数量
	post.meta.views = post.meta.views + 1;
	// 保存
	await post.save();
	// 响应
	return res.send(post);
}