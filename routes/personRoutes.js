const router = require('express').Router();

//create- criação de dados
const Person = require('../models/Person')

router.post('/', async (req, res) => {
  //req.body = onde chega os dados
  const {name, salary, approved} = req.body
  
  if (!name) {
    res.status(422).json({error: 'o nome é obrigatório'})
    return
  }
  
  const person = {
    name,
    salary,
    approved,
  }
  try {

    await Person.create(person) 

    res.status(201).json({message: 'Pessoa inserida no sistema com sucesso'})

  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/', async (req, res) => {

  try {
    
    const people = await Person.find()

    res.status(200).json(people)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

router.get('/:id', async (req, res) => {

  // extrair o dado da requisição, pela url = req.params
  const id = req.params.id

  try {
    //findOne() encontra um registro
    const person = await Person.findOne({_id: id})

    if(!person) {
      res.status(422).json({message: 'o usuário não foi encontrado'})
      return
    }

    res.status(200).json(person)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})

//atualização de dados (PUT, PATCH) PUT = bloco completo  PATCH = campos específicos

router.patch(':id', async (req, res) => {
  const id = req.params.id

  const { name, salary, approved} = req.body

  const person = {
    name,
    salary,
    approved,
  }

  try {
    //updateOne = atualiza o primeiro
    const updatePerson = await person.updateOne({_id: id}, person)

    res.status(200).json(person)

  }catch (error) {
    res.status(500).json({ error: error })
  }
})

// Delete a person
router.delete('/:id', async (req, res) => {
  const id = req.params.id

  const person = await Person.findOne({_id: id})

  if (!person) {
    res.status(422).json({ message: 'O usuario não foi encontrado!' })
    return
  }
  try{
    //deleteOne = deleta o primeiro
    await Person.deleteOne({_id: id})

    res.status(200).json({ message: 'Usuario deletado'})

  }catch (error) {
    res.status(500).json({ error: error })
  }
})

module.exports = router