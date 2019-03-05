select u.name as "Тренер",
    -- lt.name as "Занятие",
    -- from_unixtime(unix_timestamp(l.start_date_time)+10800) as  'Начало',
       count(case when lu.status_id = 2 then 1 else null end) as 'Пришли',
       count(lu.id) as 'Записались'
from lesson l
            left join lesson_user lu on lu.lesson_id = l.id
            join lesson_set set2 on l.lesson_set_id = set2.id
            join lesson_type lt on set2.lesson_type_id = lt.id
            join user u on set2.trainer_user_id = u.id
where month(start_date_time) ='2'
group by u.name -- l.id
order by u.name, l.start_date_time;

select u.name as "Тренер",
       lt.name as "Занятие",
       from_unixtime(unix_timestamp(l.start_date_time)+10800) as  'Начало',
       count(case when lu.status_id = 2 then 1 else null end) as 'Пришли',
       count(lu.id) as 'Записались'
from lesson l
            left join lesson_user lu on lu.lesson_id = l.id
            join lesson_set set2 on l.lesson_set_id = set2.id
            join lesson_type lt on set2.lesson_type_id = lt.id
            join user u on set2.trainer_user_id = u.id
where month(l.start_date_time) = '2'
group by l.id, u2.id
order by u.name, l.start_date_time



select u.name as "Тренер",
       lt.name as "Занятие",
       from_unixtime(unix_timestamp(l.start_date_time)+10800) as  'Начало',
       case when lu.status_id = 2 then 'Пришли' else 'Не Пришли' end,
    -- count(lu.id) as 'Записались'
       u2.name,
       u2.phone
from lesson l
            left join lesson_user lu on lu.lesson_id = l.id
            join user u2 on lu.user_id = u2.id
            join lesson_set set2 on l.lesson_set_id = set2.id
            join lesson_type lt on set2.lesson_type_id = lt.id
            join user u on set2.trainer_user_id = u.id
where month(l.start_date_time) = '2' and u.id = 27
group by l.id, u2.id
order by u.name, l.start_date_time