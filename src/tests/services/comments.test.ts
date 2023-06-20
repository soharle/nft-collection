import { mock, instance, when } from 'ts-mockito';
import { CollectionRepository } from '../../infrastructure/repositories/CollectionRepository';
import { CommentsRepository } from '../../infrastructure/repositories/CommentsRepository';
import { CommentsService } from '../../domain/services/comments/CommentsService';
import { collection1, collection2, collection3, comment1, comment2, comment3, comment4, user1 } from '../stubs/stubs';

describe('test CommentsService', function () {
    let mockedRepository: CommentsRepository = mock(CommentsRepository);
    let mockedCollectionRepository: CollectionRepository = mock(CollectionRepository);

    const commentsService = new CommentsService(instance(mockedRepository), instance(mockedCollectionRepository));

    when(mockedCollectionRepository.findById("collection1")).thenResolve(collection1);
    when(mockedCollectionRepository.findById("collection2")).thenResolve(collection2);
    when(mockedCollectionRepository.findById("collection3")).thenResolve(collection3);
    when(mockedRepository.getAllByCollection("collection1")).thenResolve([comment1, comment2]);
    when(mockedRepository.getAllByCollection("collection3")).thenResolve([comment3]);
    when(mockedRepository.getAllByCollection("collection2")).thenResolve([comment4]);
    when(mockedRepository.createComment(comment1.text, comment1.rating, comment1.collectionId, user1.id)).thenResolve(comment1);
    when(mockedRepository.createComment(comment4.text, comment4.rating, comment4.collectionId, user1.id)).thenResolve(comment4);
    when(mockedRepository.createComment(comment3.text, comment3.rating, comment3.collectionId, user1.id)).thenResolve(comment3);


    describe('getCommentsByCollectionId', function () {
        test('get comments from public collection owned by user', async () => {
            const result = await commentsService.getCommentsByCollectionId("collection1", user1.id);
            expect(result).toEqual([comment1, comment2]);
        })

        test('get comments from not public collection owned by user', async () => {
            const result = await commentsService.getCommentsByCollectionId("collection2", user1.id);
            expect(result).toEqual([comment4]);
        })

        test('could not get comments from collection not owned by user', async () => {
            const result = await commentsService.getCommentsByCollectionId("collection3", user1.id);
            expect(result).toBeNull();
        })
    })

    describe('create', function () {
        test('create comment on public collection owned by user', async () => {
            const result = await commentsService.create(comment1.text, comment1.rating, comment1.collectionId, user1.id);
            expect(result).toEqual(comment1);
        })

        test('create comment on not public collection owned by user', async () => {
            const result = await commentsService.create(comment4.text, comment4.rating, comment4.collectionId, user1.id);
            expect(result).toEqual(comment4);
        })

        test('could not create comment on collection not owned by user', async () => {
            const result = await commentsService.create(comment3.text, comment3.rating, comment3.collectionId, user1.id);
            expect(result).toBeNull();
        })
    })
})