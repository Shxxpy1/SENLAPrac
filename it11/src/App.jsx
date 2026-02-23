import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import './App.css'

const schema = Yup.object({
    users : Yup.array().of(
        Yup.object({
            name : Yup.string().required('Имя обязательно'),
            age : Yup.number().required('Возраст обязаетелен').positive('Возраст должен быть положительным').integer('Возраст должен быть целым'),
            email : Yup.string().email('Неверный формат').required('email обязателен'),
            phone : Yup.string().matches(/^(\+7|8)\d{10}$/).required('Телефон обязателен'),
            children : Yup.array().of(
                Yup.object({
                    name: Yup.string().required('Имя обязательно'),
                    age : Yup.number().required('Возраст обязаетелен').positive('Возраст должен быть положительным').integer('Возраст должен быть целым')
                })
            ),
        })
    ),
})

const userForm = () => {
    return (
      <div>
        <h1>Пользователи</h1>
        <Formik
          initialValues={
            { users: [
            {
              name: '',
              age: '',
              email: '',
              phone: '',
              children: [
                {
                  name: '',
                  age: ''
                }
              ]
            }
          ] }}
          validationSchema={schema}
          onSubmit={ async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}>

            {({ values }) => (
              <Form>
                <FieldArray name="users">
                  {({ push, remove, form }) => (
                    <div className='users'>
                      {values.users.map((user, index) => (
                        <div key={index} className='form-group'>
                          <h3>Пользователь {index + 1}</h3>

                          <div>
                            <label>Имя</label>
                            <Field className='form-input' name={`users[${index}].name`}/>
                            <ErrorMessage name={`users[${index}].name`}></ErrorMessage>
                          </div>
                          <div>
                            <label>Возраст</label>
                            <Field className='form-input' name={`users[${index}].age`}/>
                            <ErrorMessage name={`users[${index}].age`}></ErrorMessage>
                          </div>
                          <div>
                            <label>Email</label>
                            <Field className='form-input' name={`users[${index}].email`}/>
                            <ErrorMessage name={`users[${index}].email`}></ErrorMessage>
                          </div>
                          <div>
                            <label>Телефон</label>
                            <Field className='form-input' name={`users[${index}].phone`}/>
                            <ErrorMessage name={`users[${index}].phone`}></ErrorMessage>
                          </div>
                          <div >
                            <h4>Дети</h4>
                            <FieldArray name={`users[${index}].children`}>
                              {({ push, remove }) => (
                                <div className='children'>
                                  {user.children.map((child, childIndex) =>(
                                    <div key={childIndex}>
                                      <div>
                                          <h5>Ребенок {childIndex + 1}</h5>
                                          <label>Имя ребенка</label>
                                          <Field className='form-input' name={`users[${index}].children[${childIndex}].name`}/>
                                          <ErrorMessage name={`users[${index}].children[${childIndex}].name`}></ErrorMessage>
                                      </div>
                                      <div>
                                          <label>Возраст ребенка</label>
                                          <Field className='form-input' name={`users[${index}].children[${childIndex}].age`}/>
                                          <ErrorMessage name={`users[${index}].children[${childIndex}].age`}></ErrorMessage>
                                      </div>
                                      <button id='btn' type='button' onClick={() => remove(childIndex)}> Удалить ребенка </button>
                                    </div>
                                  
                                  ))}
                                  <button id='btn' type='button' onClick={() => push({name: '', age: ''})}>Добавить ребенка</button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                              <button id='btn' type='button' onClick={() => remove(index)}> Удалить пользователя </button>
                        </div>
                      ))}
                      <button id='btn' type='button' onClick={() => push({name: '', age: '', email: '', phone: '', children: []})}> Добавить пользователя </button>
                    </div>
                  )}
                </FieldArray>
                  <button id='btn' type='submit'>Отправить</button>
              </Form>
            )}
          </Formik>
          

      </div>
    )
}

export default userForm