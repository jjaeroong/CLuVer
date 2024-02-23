const { Schedule, SubclubUser,Club,Subclub,Clubuser} = require('../models');

exports.createSchedule = async (req, res) => {
  try {
    const user_id = req.session.user.id;
    const { schname, schcontent, eventtime,sub_id,eventDate,club_id } = req.body;

    // Clubuser를 통해 사용자가 속한 클럽의 ID 가져오기
  



 
   
    console.log('전송된 eventDate:', eventDate);
    console.log(club_id,sub_id)
    // Schedule 모델을 사용하여 일정 생성
    const newSchedule = await Schedule.create({
      user_id: user_id,
      club_id,
      sub_id,
      schname,
      schcontent,
      eventDate,
      eventtime
      
     
    });
        // sub_cate가 0이면 현재 사용자가 속한 소모임 정보를 가져옴
  
    // 클라이언트에게 응답을 보냄
    res.status(201).json({ message: '일정이 성공적으로 등록되었습니다.', schedule: newSchedule});
  } catch (error) {
    console.error('에러 발생:', error);
    res.status(500).json({ error: '일정을 등록하는 중에 오류가 발생했습니다.' });
  }
};


exports.getclubinfo = async (req, res) => {
  try {
    // Clubuser를 통해 사용자가 속한 클럽의 ID 가져오기
    const sub_cate1 = await SubclubUser.findOne({
      where: { UserId: req.session.user.id },
      attributes: ['sub_cate']
    });
    const sub_cate = sub_cate1.get('sub_cate');
    // Clubuser를 통해 사용자가 속한 소모임의 ID 가져오기
    const club_cate1 = await Clubuser.findOne({
      where: { clubuserId: req.session.user.id },
      attributes: ['club_cate']
    });
    const club_cate = club_cate1.get('club_cate');
    let user_subclubs = [];
    let user_clubs = [];
  
    // sub_cate가 0이면 현재 사용자가 속한 소모임 정보를 가져옴
    if (sub_cate1 && sub_cate1.sub_cate == 0) {
      user_subclubs = await SubclubUser.findAll({
        where: { UserId: req.session.user.id },
        include: [{ model: Subclub, attributes: ['id','subclubname'] }]
      });
      // 필요한 소모임 정보만 추출하여 배열에 담기
      user_subclubs = user_subclubs.map(subclub =>  ({id: subclub.Subclub.id, name: subclub.Subclub.subclubname}));
    }
  
    // club_cate가 0이면 현재 사용자가 속한 모임 정보를 가져옴
    if (club_cate1 && club_cate1.club_cate == 0) {
      user_clubs = await Clubuser.findAll({
        where: { clubuserId: req.session.user.id },
        include: [{ model: Club, attributes: ["club_id",'club_name'] }]
      });
      // 필요한 클럽 정보만 추출하여 배열에 담기
      user_clubs = user_clubs.map(club => ({ id: club.Club.club_id, name: club.Club.club_name }))
    }
    console.log({ sub_cate,club_cate,user_clubs, user_subclubs })
    
    // 클라이언트에게 응답을 보냄
    res.status(200).json({ sub_cate,club_cate,user_clubs, user_subclubs });
  } catch (error) {
    console.error('에러 발생:', error);
    res.status(500).json({ error: '일정을 등록하는 중에 오류가 발생했습니다.' });
  }
  
};
