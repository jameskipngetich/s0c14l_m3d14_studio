// Business logic of the app
import supabase from '../db.js';
import { readFile, writeFile } from 'fs/promises';

/* functions
 *  home()
 *  submitPost()
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
