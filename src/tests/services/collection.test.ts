import { mock, instance, when } from 'ts-mockito';
import { CollectionRepository } from '../../infrastructure/repositories/CollectionRepository';
import { CollectionService } from '../../domain/services/collection/CollectionService';
import { collection1, collection2, collection3, user1, user2 } from '../stubs/stubs';

describe('test CollectionService', function () {
    let mockedRepository: CollectionRepository = mock(CollectionRepository);

    const collectionService = new CollectionService(instance(mockedRepository));

    when(mockedRepository.findById("collection1")).thenResolve(collection1);
    when(mockedRepository.findById("collection2")).thenResolve(collection2);
    when(mockedRepository.findById("collection3")).thenResolve(collection3);
    when(mockedRepository.update("collection1", "collection1", "collection2", true)).thenResolve(collection1);
    when(mockedRepository.update("collection2", "collection2", "collection2", false)).thenResolve(collection2);
    when(mockedRepository.update("collection3", "collection3", "collection3", false)).thenResolve(collection3);
    when(mockedRepository.delete("collection1")).thenResolve(collection1);
    when(mockedRepository.delete("collection2")).thenResolve(collection2);
    when(mockedRepository.delete("collection3")).thenResolve(collection3);


    describe('get', function () {
        test('user get not public owned collection', async () => {
            const result = await collectionService.get("collection2", user1.id);
            expect(result).toEqual(collection2);
        })

        test('user get public owned collection', async () => {
            const result = await collectionService.get("collection1", user1.id);
            expect(result).toEqual(collection1);
        })

        test('user cannot get not public not owned collection', async () => {
            const result = await collectionService.get("collection3", user1.id);
            expect(result).toBeNull();
        })

        test('user cannot get public not owned collection', async () => {
            const result = await collectionService.get("collection1", user2.id);
            expect(result).toBeNull();
        })
    })

    describe('update', function () {
        test('user update not public owned collection', async () => {
            const result = await collectionService.update(collection2.id, collection2.title, collection2.description, collection2.isPublic, user1.id);
            expect(result).toEqual(collection2);
        })

        test('user cannot update not public not owned collection', async () => {
            const result = await collectionService.update(collection3.id, collection3.title, collection3.description, collection3.isPublic, user1.id);
            expect(result).toBeNull();
        })

        test('user cannot update public not owned collection', async () => {
            const result = await collectionService.update(collection1.id, collection1.title, collection1.description, collection1.isPublic, user2.id);
            expect(result).toBeNull();
        })
    })

    describe('delete', function () {
        test('user delete not public owned collection', async () => {
            const result = await collectionService.delete(collection2.id, user1.id);
            expect(result).toEqual(collection2);
        })

        test('user cannot delete not public not owned collection', async () => {
            const result = await collectionService.delete(collection3.id, user1.id);
            expect(result).toBeNull();
        })

        test('user cannot delete public not owned collection', async () => {
            const result = await collectionService.delete(collection1.id, user2.id);
            expect(result).toBeNull();
        })
    })

})
