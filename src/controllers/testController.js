

class TestController {

    test = async (req, res) => {
        return res.status(200).json({ message: 'Ruta de pruebas' });
    }

}

module.exports = TestController;