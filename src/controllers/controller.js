// Business logic of the app
import supabase from '../db.js';
import { readFile, writeFile } from 'fs/promises';

/* functions
 *  home()
 *  submitPost()
 *  viewPosts()
 *  viewPost()
 *  updatePost()
 */

export async function home(req, res){
	try{
		res.status(200).json({'message':'W e l c o m e   h o m e !    A   s o c i a l    m e d i a     s t u d i o'});
	}catch(error){
		console.error(error);
		res.status(500).json({'message':'Something went wrong :('});
	}
}

// Function to recieving and storing a post
export async function submitPost(req, res){
	console.log(`post: ${req.body.post}`);
	const name = req.body.postname;
	const post = req.body.post;
	const now = new Date();
	try{
		const myPost = { 'name':name, 'content':post };
		const filename = `./statics/${name}_123.json`;				// TODO Input validation of both post name and post content
		await writeFile(filename, JSON.stringify(myPost,null,2), 'utf8');
		const { data, error } = await supabase.from('posts').insert({name: name, access_key: filename, date_of_submission: now }).select();
		console.log(data);
		res.status(200).json({'message':"Post successfully submitted and stored"});
	}catch(error) {
		console.error(error);
		res.status(500).json({'message':"Failed to submit and store post :("});
	}
}

// Function to view submitted posts
export async function viewPosts( req, res ) {
	try {
		const { data, error } = await supabase.from('posts').select();
		const posts = JSON.parse( JSON.stringify({
			data: data.map(( { name, date_of_submission }) => ({ name, date_of_submission }))
		}, null, 2));
		res.status(200).json(posts);
	}catch(error) {
		console.error(error);
		res.status(500).json({"message": "Failed to retrieve posts :( "});
	}
}

// View submitted post
export async function viewPost( req, res ) {
	const post_name = req.params.name;
	try {
		const { data, error } = await supabase.from('posts').select().eq('name', post_name);
		const filename = data[0].access_key;
		console.log(filename);
		const post_data = JSON.parse( await readFile(filename, 'utf8'));

		res.status(200).json(post_data);
	}catch(error) {
		console.error(error);
		res.status(500).json({"message": "Failed to retrieve post :( "});
	}
}

// Update a post
export async function updatePost(req, res) {
	const post_name = req.params.name;
	try {
		const {data, error: selectError } = await supabase.from('posts').select().eq('name', post_name);
		if(selectError){
			console.log(selectError);
			res.status(404).json({'error': 'Post not found :( '});
			return;
		}
		const filename = data[0].access_key;
		const id = data[0].id;
		const current_post_data = JSON.parse( await readFile(filename, 'utf8'));
		const post_data = { 'name':post_name, 'content':req.body.post} ?? current_post_data;
		await writeFile(filename, JSON.stringify(post_data,null,2), 'utf8');
	        const { error: updateError } = await supabase.from('posts').update({name: post_name}).eq('id', id);

		if(updateError) {
			console.log(updateError);
			res.status(400).json({'error': 'Failed to update post :( '});
			return;
		}

		res.status(200).json({'message': "Post successfully updated :)"});
	} catch(error) {
		console.error(error);
		res.status(500).json({'message': "Failed to update post :( "});
	}
}
