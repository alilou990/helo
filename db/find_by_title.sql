select * from users u
join posts p on u.id = p.author_id
where title like ('%' || $1 || '%')