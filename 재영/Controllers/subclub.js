const User = require('../models/user');
const Subclub = require('../models/subclub');
const SubclubUser = require('../models/subclubusers');

exports.getUserSubclubs = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: { id: userId },
    });

    const subclubList = await SubclubUser.findAll({
      where: { UserId: userId }, 
      include: [
        {
          model: Subclub,
          attributes: ["subclubname"],
        },
      ],
    });

    console.log(subclubList);

    const Allsubclublist = await Subclub.findAll();
    const totalCount = Allsubclublist.length;
    console.log(Allsubclublist);

    console.log({ user: user.username });
    
    const subclubs = await user.getSubclubs(); // 현재 유저가 참여한 소모임 목록

    const Subclubsuserlist = await Promise.all(
      subclubs.map(async (subclub) => {
        const users = await subclub.getUsers(); 
        const memberCount = users.length; // 회원 수 계산
        return { subclub, users, memberCount };// 같은 소모임에 참여한 유저 목록
       
      })
    );
   // 가져올 소모임의 이름 설정


    console.log(Subclubsuserlist);
    
    res.render('smallgrouplists', { user: user.username, subclubList, Allsubclublist,totalCount, Subclubsuserlist  });

  } catch (error) {
    console.error('에러 발생:', error);
    res.status(500).send('Internal Server Error');
  }
}





// exports.getAllSubclubs = async (req, res) => {
 
//   try {
  
   
//     const Allsubclublist = await Subclub.findAll({

//       // include: [
//       //   {
//       //     model: User,
          
         
//       //   },
//       // ],
//     });

//    console.log({Allsubclublist})
//     res.render('subclub', { Allsubclublist });
//   } catch (error) {
//     console.log(error);
//   }
// };

