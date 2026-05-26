package com.BADBOY.hotel_reservation.service.Person;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.BADBOY.hotel_reservation.dto.Person.GuestCreationRequest;
import com.BADBOY.hotel_reservation.dto.Person.GuestDto;
import com.BADBOY.hotel_reservation.entity.Guest;
import com.BADBOY.hotel_reservation.repository.Person.GuestRepository;
import com.BADBOY.hotel_reservation.repository.ReservationGuestRepository;

@Service
@Transactional
public class GuestDomain {
    @Autowired private GuestRepository gRepo;
    @Autowired private ReservationGuestRepository resGuestRepo;

    public GuestDto create(GuestCreationRequest rq) {
        gRepo.insertGuest(
            rq.getFirstName(), rq.getLastName(),rq.getIdentityNum(),
            rq.getPhone(),rq.getDateOfBirth());

        Guest g = gRepo.findGuestByIdentityNum(rq.getIdentityNum())
            .orElseThrow(() -> new IllegalStateException("Cannot load Guest after insert"));

        return GuestDto.fromEntity(g);
    }

    @Transactional(readOnly = true)
    public List<GuestDto> getAll() {
        return gRepo.takeAll()
            .stream()
            .map(GuestDto::fromEntity)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public GuestDto getById(Integer id) {
        Guest g = gRepo.findGuestById(id)
            .orElseThrow(() -> new IllegalArgumentException("Guest not found: " + id));
        return GuestDto.fromEntity(g);
    }

    public GuestDto update(Integer id, GuestCreationRequest rq) {
        gRepo.findGuestById(id)
            .orElseThrow(() -> new IllegalArgumentException("Guest not found: " + id));

        gRepo.updateGuest(
            id,rq.getFirstName(),rq.getLastName(),
            rq.getIdentityNum(),rq.getPhone(),
            rq.getDateOfBirth());

        Guest updated = gRepo.findGuestById(id)
            .orElseThrow(() -> new IllegalStateException("Cannot load Guest after update"));

        return GuestDto.fromEntity(updated);
    }

    public void delete(Integer id) {
        gRepo.findGuestById(id)
            .orElseThrow(() -> new IllegalArgumentException("Guest not found: " + id));
        
        // Check if guest has any reservation records
        List<?> reservationGuests = resGuestRepo.findByIdGuestId(id);
        if (!reservationGuests.isEmpty()) {
            throw new IllegalStateException(
                "Cannot delete guest who has existing reservations. " +
                "Guest has " + reservationGuests.size() + " reservation record(s). " +
                "Không thể xóa khách hàng đã có đặt phòng."
            );
        }
        
        gRepo.deleteGuest(id);
    }
}
