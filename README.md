# Sistema de Préstamos de Libros


Este proyecto es una aplicación de consola en JavaScript que permite gestionar préstamos de libros de una librería. Permite registrar libros, clientes y préstamos, y consultar la disponibilidad de los libros.
El flujo está diseñado para funcionar desde la terminal, navegando por menús interactivos y validaciones automáticas de datos.
Ejecución:
 Primero se debería de abrir la terminal en la carpeta del proyecto e instalar las dependencias (npm install), para poder ejecutar node index.js lo que va a abrir la consola llamando a la función menu() del modulo cli/menu.js


Flujo y uso:
Lo primero que solicita el programa es el DNI con la función ingreso(DNI)( cli / ingreso.js). Si el usuario ya está registrado, es decir existe en la base de datos (data.json) devuelve un mensaje de bienvenida con el objetos el usuario, si no existe nos dirige a registrar el nuevo cliente usando registrarCliente(), esto se diseñó así para evitar tener error en un futuro con por ejemplo prestar un libro a una persona no registrada.


Menu Principal: hay dos menus por eso se necesita un menu principara para preguntar si el usuario es administrador o usuario normal, depende de esa decision si se habre el menu Administrador => manejarMenuAdmin() o el menu de Usuario => menjarMenuUsuario(usuario).


Menu de Administrador (cli/menuAdmin.js)
  Listar libros => listarLibros()
  Agregar libro => agregarLibro() 
  Modificar libro => modificarLibro()
  Eliminar libro => eliminarLibro()
  Listar préstamos => listarPrestamos()
  Listar clientes => listarUsuarios()
  Modificar clientes=> modificarCliente()
  Eliminar clientes =>eliminarCliente()
  Volver al menú anterior

   
Menu de usuarios (cli/menuUsuarios.js)
  Listar libros=> listarLibros()
  Consultar libro por nombre=>consultarPorNombre()
  Solicitar libro =>crearPrestamo(usuario)
  Devolver libro=> devolverLibro(usuario)


4.Gestion de datos:
En db/data.json es un archivo .JSON que contiene un objeto donde están todos los datos guardados tanto de clientes,libros y de los préstamos. Para que se puedan comunicar y actualizar la base de datos tenemos el archivo db/fileManager.js donde se exporta la función leerDatos(), guardar(data) estas funciones son para que cada vez que se hace una modificación se actualice correctamente nuestra base de datos 



5.Modelo de datos:
El programa utiliza tres modelos principales, definidos como clases Libro, Usuario y Préstamo (model/libros.models.js). Las clases definen la estructura de los datos en la base de datos. Por ejemplo, un usuario no puede crearse sin nombre, ya que en el campo nombre es obligatorio en la clase Usuario.


6.Validaciones:
En este módulo tenemos todas las funciones que validan todos los datos desde un dnd hasta el stock de un libro. Lo que se intenta es evitar errores a la hora del que usuario navegue.


7. Funciones auxiliares:
Son funciones más generales facilitan el funcionamiento de las funciones principales, sin estorbar en el código. Por ejemplo Generar un ID createID(c) con la posibilidad de que sea versátil para cualquier campo. 



