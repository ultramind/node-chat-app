const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() =>{
        users = new Users();
        users.users[{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },{
            id: '2',
            name: 'Chioma',
            room: 'Node Course'
        },{
            id: '3',
            name: 'Kosy',
            room: 'React Course'
        }]
    });
    it('Should add users', () => {
        var users = new Users();
        var user = {
            id:'2',
            name: 'Akachukwu',
            room: 'Node Course'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('Should return the list', () =>{
        var list = users.getUserList('Node Course');

        expect(list).toEqual(['Akachukwu', 'Chioma']);
    });

    it('Should remove user', () => {
        var userId = '1';
        var user = users.removeUser(userId);

        expect(users.id).toBe(userId);
        expect(users.users.length).toBe(3)
    })
});