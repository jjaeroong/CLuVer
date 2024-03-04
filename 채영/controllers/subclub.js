const User = require('../models/user');
const Subclub = require('../models/subclub');
const SubclubUser = require('../models/subclubusers');

exports.getUserSubclubs = async (req, res) => {


  try {
    const userId = req.params.id;
    const user = await User.findOne({
      where: { id: userId },
    });
    // SubclubUser 모델과 Subclub 모델을 조인하여 유저가 참여 중인 소모임 목록을 조회합니다.
    const subclubList = await SubclubUser.findAll({
      where: { UserId: userId }, 
      include: [
        {
          model: Subclub,
          attributes: ["subclubname"],
        },
      ],
    });

    console.log(subclubList)
    const Allsubclublist = await Subclub.findAll({
      
          
      
    });

    console.log(Allsubclublist)

    console.log({user:user.username});
    res.render('subclub', { user: user.username, subclubList,Allsubclublist });

   
  } catch (error) {
    console.error('소모임 목록 조회 오류:', error);
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

