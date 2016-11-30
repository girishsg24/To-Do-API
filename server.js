var express=require('express');
var app=express();
var PORT=process.env.PORT||3000;
var bodyParser=require('body-parser');
var _=require('underscore');
app.use(bodyParser.json());
var id=1;
var todos=[];
app.get('/',
	function(req,res)
	{
		res.send("To-Do API Root");
	}
);

app.get('/todos',
		function(req,res)
		{
			res.json(todos);
		}
	);

app.get('/todos/:id',
		function(req,res)
		{
			var matchedTodoItem=_.findWhere(todos,{id:parseInt(req.params.id)});
			if (matchedTodoItem)
				res.json(matchedTodoItem);
			else
				res.status(404).send('Page Not found Ya!');
		}
	);

app.post('/todos',
	function(req,res)
	{


		var body=_.pick(req.body,'description','completed');
		//body.description=body.description.trim();
		if (_.isBoolean(body.completed)&&_.isString(body.description)&& body.description.trim().length!=0)
		{
			body.description=body.description.trim();
			body.id=id++;
			todos.push(body);
			res.json(body);
		}
		else
			return res.status(400).send('Unable to create todos due to bad data');
	}
);

app.delete('/todos/:id', function (req, res) {
	//var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: parseInt(req.params.id)});

	if (!matchedTodo) {
		res.status(404).json({"error": "no todo found with that id"});
	} else {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}
});

app.listen(PORT,
			function()
			{
				console.log("Running Express at port number: "+PORT+'!');
			}
		);


