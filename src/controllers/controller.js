// Business logic of the app



export async function home(req, res){
	try{
		res.status(200).json({'message':'W e l c o m e   h o m e !    A   s o c i a l    m e d i a     s t u d i o'});
	}catch(error){
		console.error(error);
		res.status(500).json({'message':'Something went wrong :('});
	}
}
