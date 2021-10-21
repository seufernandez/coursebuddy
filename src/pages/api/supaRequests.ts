/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-case-declarations */
import { Console } from 'console';
import { getSession } from 'next-auth/client';
import { supabase } from '../../services/supabase';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === 'GET') {
    const { type, current_user_id, search, course_id, course_slug_number } =
      req.headers;

    switch (type) {
      case 'get-user-data':
        const { data: userData, error: getUserDataError } = await supabase
          .from('users')
          .select('id, name, email')
          .eq('email', session?.user.email)
          .single();

        if (getUserDataError) {
          return res
            .status(400)
            .send(
              `Error getting top courses request: ${getUserDataError.message}`
            );
        }

        res.status(200).json(userData);
        break;

      case 'COMMUNITY-get-latest-courses':
        const { data: courses, error } = await supabase
          .from('courses')
          .select('slug_number, name, image, likes, resumes_available')
          .order('created_at', { ascending: false })
          .range(0, 2);

        if (error) {
          return res
            .status(400)
            .send(`Error getting latest courses request: ${error.message}`);
        }

        res.status(200).json(courses);
        break;

      case 'COMMUNITY-get-most-liked-courses':
        const { data: mostLikedCourses, error: mostLikedCoursesErr } =
          await supabase
            .from('courses')
            .select('slug_number, name, image, likes, resumes_available')
            .order('likes', { ascending: false });

        if (mostLikedCoursesErr) {
          return res
            .status(400)
            .send(
              `Error getting top courses request: ${mostLikedCoursesErr.message}`
            );
        }

        res.status(200).json(mostLikedCourses);
        break;

      case 'HOME-get-liked-courses':
        const { data: likedCourses, error: likedCoursesErr } = await supabase
          .from('course_likes')
          .select(
            `
          courses: course_id (slug_number, name, description, image, resumes_available, likes)
        `
          )
          .order('created_at', { ascending: false })
          .eq('user_id', current_user_id);

        if (likedCoursesErr) {
          return res
            .status(400)
            .send(
              `Error getting top courses request: ${likedCoursesErr.message}`
            );
        }

        const likedCoursesArray = likedCourses
          ? likedCourses.map(array => array.courses)
          : [];

        res.status(200).json(likedCoursesArray);
        break;

      case 'SEARCH-get-searched-courses':
        if (search === '') {
          return res.status(200).json([]);
        }
        const { data: searchedCourses, error: searchedCoursesErr } =
          await supabase
            .from('courses')
            .select('slug_number, name, image, likes, resumes_available')
            .order('likes', { ascending: false })
            //   .or(`
            //   name.textSearch.${search},description.textSearch.${search},
            // `);
            .textSearch('name', `'${search}'`);

        if (searchedCoursesErr) {
          return res
            .status(400)
            .send(
              `Error getting top courses request: ${searchedCoursesErr.message}`
            );
        }

        res.status(200).json(searchedCourses);
        break;

      case 'SEARCH-get-searched-resumes':
        if (search === '') {
          return res.status(200).json([]);
        }
        const { data: searchedResumes, error: searchedResumesErr } =
          await supabase
            .from('resumes')
            .select(
              `
            id, name, image, likes,
            users: creator_id ( name )
          `
            )
            // .order('likes', { ascending: false })
            .textSearch('name', `'${search}'`);

        if (searchedResumesErr) {
          return res
            .status(400)
            .send(
              `Error getting top resumes request: ${searchedResumesErr.message}`
            );
        }

        res.status(200).json(searchedResumes);
        break;

      case 'COURSE-get-latest-resumes':
        const { data: latestResumes, error: latestResumesErr } = await supabase
          .from('resumes')
          .select(
            `
            id, name, image, likes,
            users: creator_id ( name )
          `
          )
          .order('created_at', { ascending: false })
          .eq('course_id', String(course_id));

        if (latestResumesErr) {
          return res
            .status(400)
            .send(
              `Error getting latest resumes request: ${latestResumesErr.message}`
            );
        }

        res.status(200).json(latestResumes);
        break;

      case 'COURSE-get-top-liked-resumes':
        const { data: topCourseResumes, error: topCourseResumesErr } =
          await supabase
            .from('resumes')
            .select(
              `
          id, name, image, likes,
          users: creator_id ( name )
          `
            )
            .order('likes', { ascending: false })
            .eq('course_id', String(course_id));

        if (topCourseResumesErr) {
          return res
            .status(400)
            .send(
              `Error getting latest resumes request: ${topCourseResumesErr.message}`
            );
        }

        res.status(200).json(topCourseResumes);
        break;

      case 'HOME-get-liked-resumes':
        const { data: likedResumes, error: likedResumesErr } = await supabase
          .from('resume_likes')
          .select(
            `
          resumes: resume_id (id, name, description, image, likes, creator_id, users: creator_id (name))
        `
          )
          .order('created_at', { ascending: false })
          .eq('user_id', current_user_id);

        if (likedResumesErr) {
          return res
            .status(400)
            .send(
              `Error getting top resumes request: ${likedResumesErr.message}`
            );
        }

        const likedResumesArray = likedResumes
          ? likedResumes.map(array => array.resumes)
          : [];

        res.status(200).json(likedResumesArray);
        break;

      case 'COURSE-increment-course-view':
        const { data } = await supabase.rpc('incrementcourseview', {
          row_slug_number: course_slug_number,
        });

        break;

      default:
        throw new Error('Unhandled event');
    }
  }

  if (req.method === 'POST') {
    const { type } = req.body.headers;

    const reqBody = req.body;
    const { values, currentUserId, courseId, resumeId } = reqBody;

    switch (type) {
      case 'community-create-course':
        const { data: courseData, error } = await supabase
          .from('courses')
          .insert([
            {
              name: values.name,
              description: values.description,
              image: values.image,
              tags: values.tags,
              creator_id: currentUserId,
            },
          ])
          .single();

        if (error) {
          return res
            .status(400)
            .send(`Error creating new Course Thread: ${error.message}`);
        }

        res.status(200).json({ newCourseNumberSlug: courseData.slug_number });
        break;

      case 'course-create-resume':
        const { data: resumeData, error: err } = await supabase
          .from('resumes')
          .insert([
            {
              name: values.name,
              description: values.description,
              image: values.image,
              link: values.link,
              tags: values.tags,
              creator_id: currentUserId,
              course_id: courseId,
            },
          ])
          .single();

        if (err) {
          return res
            .status(400)
            .send(`Error creating new Resume: ${err.message}`);
        }

        const { data, error: incrementCourseResumeError } = await supabase.rpc(
          'incrementcourseresume',
          {
            row_id: courseId,
          }
        );

        if (incrementCourseResumeError) {
          return res
            .status(400)
            .send(
              `Error creating new Resume: ${incrementCourseResumeError.message}`
            );
        }

        res.status(200).json({ newResumeId: resumeData.id });

        break;

      case 'course-like-course':
        const { error: likeErr } = await supabase.from('course_likes').insert([
          {
            course_id: courseId,
            user_id: currentUserId,
          },
        ]);

        if (likeErr) {
          return res.status(400).send(`Error while liking: ${error.message}`);
        }

        const { error: incrementCourseLikeError } = await supabase.rpc(
          'incrementcourselike',
          {
            row_id: courseId,
          }
        );

        if (incrementCourseLikeError) {
          return res.status(400).send(`Error while liking: ${error.message}`);
        }

        res.status(200).json({ success: 'success' });
        break;

      case 'course-unlike-course':
        const { error: unlikeErr } = await supabase
          .from('course_likes')
          .delete()
          .eq('user_id', currentUserId)
          .eq('course_id', courseId);

        if (unlikeErr) {
          return res.status(400).send(`Error while unliking: ${error.message}`);
        }

        const { error: decrementCourseLikeError } = await supabase.rpc(
          'decrementcourselike',
          {
            row_id: courseId,
          }
        );
        if (decrementCourseLikeError) {
          return res.status(400).send(`Error while liking: ${error.message}`);
        }

        res.status(200).json({ success: 'success' });
        break;

      case 'RESUME-like-resume':
        const { error: likeResumeErr } = await supabase
          .from('resume_likes')
          .insert([{ resume_id: resumeId, user_id: currentUserId }]);

        if (likeResumeErr) {
          return res
            .status(400)
            .send(`Error while liking: ${likeResumeErr.message}`);
        }

        const { error: incrementResumeLikeError } = await supabase.rpc(
          'incrementresumelike',
          {
            row_id: resumeId,
          }
        );

        if (incrementResumeLikeError) {
          return res
            .status(400)
            .send(`Error while liking: ${incrementResumeLikeError.message}`);
        }

        res.status(200).json({ success: 'success' });
        break;

      case 'RESUME-unlike-resume':
        const { error: unlikeResumeErr } = await supabase
          .from('resume_likes')
          .delete()
          .eq('user_id', currentUserId)
          .eq('resume_id', resumeId);

        if (unlikeResumeErr) {
          return res
            .status(400)
            .send(`Error while unliking: ${unlikeResumeErr.message}`);
        }

        const { error: decrementResumeLikeError } = await supabase.rpc(
          'decrementresumelike',
          {
            row_id: resumeId,
          }
        );
        if (decrementResumeLikeError) {
          return res
            .status(400)
            .send(`Error while liking: ${decrementResumeLikeError.message}`);
        }

        res.status(200).json({ success: 'success' });
        break;

      default:
        throw new Error('Unhandled event');
    }
  }
}
